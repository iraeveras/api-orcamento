// FILE: src/domain/repositories/employeeRepository.ts
import { Employee } from '@/domain/entities/Employee';

export interface IEmployeeRepository {
    create(data: Omit<Employee, 'id' | 'createdAt' | 'updatedAt'>): Promise<Employee>;
    findById(id: number, companyId: number): Promise<Employee | null>;
    list(companyId: number): Promise<Employee[]>;
    update(id: number, companyId: number, data: Partial<Employee>): Promise<Employee>;
    delete(id: number, companyId: number): Promise<boolean>;
}