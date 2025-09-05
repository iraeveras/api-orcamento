//FILE: src/domain/repositories/departmentRepository.ts
import { Department } from '@/domain/entities/Department';

export interface IDepartmentRepository {
    create(data: Omit<Department, 'id' | 'createdAt' | 'updatedAt'>): Promise<Department>;
    update(id: number, companyId: number, data: Partial<Department>): Promise<Department>;
    findById(id: number, companyId: number): Promise<Department | null>;
    list(companyId: number): Promise<Department[]>;
    delete(id: number, companyId: number): Promise<boolean>;
}