import { ISectorRepository } from '@/domain/repositories/sectorRepository';
import { IAuditlogRepository } from '@/domain/repositories/auditlogRepository';
import { Sector } from '@/domain/entities/Sector';

interface CreateSectorDTO {
    name: string;
    companyId: number;
    departmentId: number;
    status: string;
}
interface CreateContext {
    userId: number;
    ipAddress: string;
}

export function createSectorUseCase(
    sectorRepository: ISectorRepository,
    auditlogRepository: IAuditlogRepository,
) {
    return {
        async execute(data: CreateSectorDTO, context: CreateContext): Promise<Sector> {
            const sector = await sectorRepository.create(data);

            await auditlogRepository.log({
                userId: context.userId,
                action: 'create',
                entity: 'Sector',
                entityId: String(sector.id),
                newData: sector,
                ipAddress: context.ipAddress,
            });

            return sector;
        },
    };
}
