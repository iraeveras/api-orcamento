// FILE: src/domain/usecases/sector/deleteSectorUseCase.ts
import { ISectorRepository } from '@/domain/repositories/sectorRepository';
import { IAuditlogRepository } from '@/domain/repositories/auditlogRepository';

interface DeleteContext {
    userId: number;
    ipAddress: string;
}

export function deleteSectorUseCase(
    sectorRepository: ISectorRepository,
    auditlogRepository: IAuditlogRepository,
) {
    return {
        async execute(id: number, companyId: number, context: DeleteContext): Promise<void> {
            const before = await sectorRepository.findById(id, companyId);
            await sectorRepository.delete(id, companyId);

            await auditlogRepository.log({
                userId: context.userId,
                action: 'delete',
                entity: 'Sector',
                entityId: String(id),
                oldData: before,
                ipAddress: context.ipAddress,
            });
        },
    };
}