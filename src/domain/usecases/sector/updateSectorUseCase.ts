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
        async execute(id: number, data: Partial<Sector>, context: UpdateContext): Promise<Sector> {
            const sector = await sectorRepository.update(id, data);

            await auditlogRepository.log({
                userId: context.userId,
                action: 'update',
                entity: 'Sector',
                entityId: String(sector.id),
                newData: data,
                ipAddress: context.ipAddress,
            });

            return sector;
        },
    };
}
