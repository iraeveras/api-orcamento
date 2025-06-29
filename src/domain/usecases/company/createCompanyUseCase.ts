import { ICompanyRepository } from '@/domain/repositories/companyRepository';
import { IAuditlogRepository } from '@/domain/repositories/auditlogRepository';
import { Company } from '@/domain/entities/Company';

// DTO para criação de empresa
export interface CreateCompanyDTO {
    cnpj: string;
    corporateName: string;
    tradeName: string;
    status?: string;
}

// Contexto comum para log de auditoria
interface CreateContext {
    userId: number;
    ipAddress?: string;
}

export function createCompanyUseCase(companyRepository: ICompanyRepository, auditlogRepository: IAuditlogRepository) {
    return {
        async execute(data: CreateCompanyDTO, context: CreateContext): Promise<Company> {
            
            const payload = {
                ...data,
                status: data.status ?? 'active',
            };

            const company = await companyRepository.create(payload);
            await auditlogRepository.log({
                userId: context.userId,
                action: 'create',
                entity: 'Company',
                entityId: String(company.id),
                newData: company,
                ipAddress: context.ipAddress,
            });

            return company;
        }
    };
}