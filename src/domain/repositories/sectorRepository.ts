import { Sector } from '@/domain/entities/Sector';

export interface ISectorRepository {
    create(data: Omit<Sector, 'id' | 'createdAt' | 'updatedAt'>): Promise<Sector>;
    update(id: number, data: Partial<Sector>): Promise<Sector>;
    findById(id: number): Promise<Sector | null>;
    list(): Promise<Sector[]>;
    delete(id: number): Promise<boolean>;
}