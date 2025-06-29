import { ICostCenterRepository } from '@/domain/repositories/costCenterRepository';
import { IAuditlogRepository } from '@/domain/repositories/auditlogRepository';
import { CostCenter } from '@/domain/entities/CostCenter';

interface CreateCostCenterDTO {
    name: string;
    code: string;
    companyId: number;
    departmentId: number;
    sectorId: number;
    status?: string;
}

interface CreateContext {
    userId: number;
    ipAddress: string;
}

export function createCostCenterUseCase(
    costCenterRepository: ICostCenterRepository,
    auditlogRepository: IAuditlogRepository
) {
    return {
        async execute(data: CreateCostCenterDTO, context: CreateContext): Promise<CostCenter> {
            const costCenter = await costCenterRepository.create(data);

            await auditlogRepository.log({
                userId: context.userId,
                action: 'create',
                entity: 'CostCenter',
                entityId: String(costCenter.id),
                newData: costCenter,
                ipAddress: context.ipAddress
            });

            return costCenter;
        }
    };
}
