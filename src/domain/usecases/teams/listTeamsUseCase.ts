// FILE: src/domain/usecases/teams/listTeamsUseCase.ts
import { ITeamsRepository } from '@/domain/repositories/teamsRepository';
import { Team } from '@/domain/entities/Teams';

export function listTeamsUseCase(teamsRepository: ITeamsRepository) {
    return {
        async execute(companyId: number): Promise<Team[]> {
            return teamsRepository.list(companyId);
        }
    };
}