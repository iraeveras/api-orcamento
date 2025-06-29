// src/domain/repositories/companyRepository.ts
import { Company } from '@/domain/entities/Company';

export interface ICompanyRepository {
    create(data: Omit<Company, 'id' | 'createdAt' | 'updatedAt'>): Promise<Company>;
    findById(id: number): Promise<Company | null>;
    list(): Promise<Company[]>;
    update(id: number, data: Partial<Company>): Promise<Company>;
    delete(id: number): Promise<boolean>;
}