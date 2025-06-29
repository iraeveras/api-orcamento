import { ICompanyRepository } from '@/domain/repositories/companyRepository';
import { IAuditlogRepository } from '@/domain/repositories/auditlogRepository';

export interface DeleteContext {
    userId: number;
    ipAddress?: string;
}

export function deleteCompanyUseCase(
    companyRepository: ICompanyRepository,
    auditlogRepository: IAuditlogRepository
) {
    return {
        async execute(id: number, context: DeleteContext): Promise<boolean> {
            const oldCompany = await companyRepository.findById(id);
            const deleted = await companyRepository.delete(id);
            if (deleted) {
                await auditlogRepository.log({
                    userId: context.userId,
                    action: 'delete',
                    entity: 'Company',
                    entityId: String(id),
                    oldData: oldCompany,
                    ipAddress: context.ipAddress,
                });
            }
            return deleted;
        }
    };
}
