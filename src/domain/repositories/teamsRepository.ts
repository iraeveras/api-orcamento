// FILE: src/domain/repositories/teamsRepository.ts
import { Team } from '@/domain/entities/Teams';

export interface ITeamsRepository {
    create(data: Omit<Team, 'id' | 'createdAt' | 'updatedAt'>): Promise<Team>;
    update(id: number, data: Partial<Team>): Promise<Team>;
    findById(id: number): Promise<Team | null>;
    list(): Promise<Team[]>;
    delete(id: number): Promise<boolean>;
}