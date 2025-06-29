import { Employee } from '@/domain/entities/Employee';

export interface IEmployeeRepository {
    create(data: Omit<Employee, 'id' | 'createdAt' | 'updatedAt'>): Promise<Employee>;
    findById(id: number): Promise<Employee | null>;
    list(): Promise<Employee[]>;
    update(id: number, data: Partial<Employee>): Promise<Employee>;
    delete(id: number): Promise<boolean>;
}