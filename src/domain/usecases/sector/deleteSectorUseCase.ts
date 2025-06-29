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
        async execute(id: number, context: DeleteContext): Promise<void> {
            await sectorRepository.delete(id);

            await auditlogRepository.log({
                userId: context.userId,
                action: 'delete',
                entity: 'Sector',
                entityId: String(id),
                ipAddress: context.ipAddress,
            });
        },
    };
}
