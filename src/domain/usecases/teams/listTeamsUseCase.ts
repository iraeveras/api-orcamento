// FILE: src/domain/usecases/teams/listTeamsUseCase.ts
import { ITeamsRepository } from '@/domain/repositories/teamsRepository';

export function listTeamsUseCase(teamsRepository: ITeamsRepository) {
    return {
        async execute() {
            return teamsRepository.list();
        }
    }
}