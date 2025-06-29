import { ICompanyRepository } from '@/domain/repositories/companyRepository';
import { Company } from '@/domain/entities/Company';

export function listCompanyUseCase(companyRepository: ICompanyRepository) {
    return {
        async execute(): Promise<Company[]> {
            return companyRepository.list();
        }
    };
}