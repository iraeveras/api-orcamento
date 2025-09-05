// FILE: src/domain/usecases/sector/createSectorUseCase.ts
// FILE: src/domain/usecases/sector/createSectorUseCase.ts
import { ISectorRepository } from '@/domain/repositories/sectorRepository';
import { IAuditlogRepository } from '@/domain/repositories/auditlogRepository';
import { Sector } from '@/domain/entities/Sector';

interface CreateSectorDTO {
    name: string;
    companyId: number;      // forçado pelo middleware no controller
    departmentId: number;   // <-- number (não string)
    status?: string;
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
            // Tipamos o payload exatamente como o repositório espera
            const payload: Omit<Sector, 'id' | 'createdAt' | 'updatedAt'> = {
                name: data.name,
                companyId: data.companyId,
                departmentId: data.departmentId,
                status: data.status ?? 'active',
            };

            const sector = await sectorRepository.create(payload);

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