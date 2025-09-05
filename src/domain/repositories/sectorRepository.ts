// FILE: src/domain/repositories/sectorRepository.ts
import { Sector } from '@/domain/entities/Sector';

export interface ISectorRepository {
    create(data: Omit<Sector, 'id' | 'createdAt' | 'updatedAt'>): Promise<Sector>;
    update(id: number, companyId: number, data: Partial<Sector>): Promise<Sector>;
    findById(id: number, companyId: number): Promise<Sector | null>;
    list(companyId: number): Promise<Sector[]>;
    delete(id: number, companyId: number): Promise<boolean>;
}