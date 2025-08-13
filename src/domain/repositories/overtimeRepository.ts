import { Overtime } from '@/domain/entities/Overtime';

export interface IOvertimeRepository {
    create(data: Omit<Overtime, 'id' | 'createdAt' | 'updatedAt'>): Promise<Overtime>;
    update(id: number, data: Partial<Overtime>): Promise<Overtime>;
    findById(id: number): Promise<Overtime | null>;
    list(): Promise<Overtime[]>;
    delete(id: number): Promise<boolean>;
}