// FILE: src/domain/repositories/teamsRepository.ts
import { Team } from '@/domain/entities/Teams';

export interface ITeamsRepository {
    create(data: Omit<Team, 'id' | 'createdAt' | 'updatedAt'>): Promise<Team>;
    update(id: number, companyId: number, data: Partial<Team>): Promise<Team>;
    findById(id: number, companyId: number): Promise<Team | null>;
    list(companyId: number): Promise<Team[]>;
    delete(id: number, companyId: number): Promise<boolean>;
}