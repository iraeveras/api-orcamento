// FILE: src/domain/usecases/sector/updateSectorUseCase.ts
import { ISectorRepository } from '@/domain/repositories/sectorRepository';
import { IAuditlogRepository } from '@/domain/repositories/auditlogRepository';
import { Sector } from '@/domain/entities/Sector';

interface UpdateContext {
    userId: number;
    ipAddress: string;
}

export function updateSectorUseCase(
    sectorRepository: ISectorRepository,
    auditlogRepository: IAuditlogRepository,
) {
    return {
        async execute(id: number, companyId: number, data: Partial<Sector>, context: UpdateContext): Promise<Sector> {
            const before = await sectorRepository.findById(id, companyId);
            const sector = await sectorRepository.update(id, companyId, data);

            await auditlogRepository.log({
                userId: context.userId,
                action: 'update',
                entity: 'Sector',
                entityId: String(sector.id),
                oldData: before,
                newData: data,
                ipAddress: context.ipAddress,
            });

            return sector;
        },
    };
}