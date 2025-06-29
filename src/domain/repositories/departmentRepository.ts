import { Department } from '@/domain/entities/Department';

export interface IDepartmentRepository {
    create(data: Omit<Department, 'id' | 'createdAt' | 'updatedAt'>): Promise<Department>;
    update(id: number, data: Partial<Department>): Promise<Department>;
    findById(id: number): Promise<Department | null>;
    list(): Promise<Department[]>;
    delete(id: number): Promise<boolean>;
}