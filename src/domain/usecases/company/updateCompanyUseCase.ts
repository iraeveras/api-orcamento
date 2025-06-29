import { ICompanyRepository } from '@/domain/repositories/companyRepository';
import { IAuditlogRepository } from '@/domain/repositories/auditlogRepository';
import { Company } from '@/domain/entities/Company';

export interface UpdateContext {
    userId: number;
    ipAddress?: string;
}

export function updateCompanyUseCase(
    companyRepository: ICompanyRepository,
    auditlogRepository: IAuditlogRepository
) {
    return {
        async execute(id: number, data: Partial<Company>, context: UpdateContext): Promise<Company> {
            const oldCompany = await companyRepository.findById(id);
            const updated = await companyRepository.update(id, data);
            await auditlogRepository.log({
                userId: context.userId,
                action: 'update',
                entity: 'Company',
                entityId: String(id),
                oldData: oldCompany,
                newData: updated,
                ipAddress: context.ipAddress,
            });
            return updated;
        }
    };
}
