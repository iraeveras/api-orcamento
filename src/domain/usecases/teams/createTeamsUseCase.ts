// FILE: src/domain/usecases/teams/createTeamsUseCase.ts
import { ITeamsRepository } from '@/domain/repositories/teamsRepository';
import { IAuditlogRepository } from '@/domain/repositories/auditlogRepository';
import { Team } from '@/domain/entities/Teams';

interface CreateTeamDTO {
    name: string;
    companyId: number;
    sectorId: number;
    leaderId: number;
    members?: number[];
    status?: string;
}

interface CreateContext {
    userId: number;
    ipAddress: string;
}

export function createTeamsUseCase(
    teamsRepository: ITeamsRepository,
    auditlogRepository: IAuditlogRepository
) {
    return {
        async execute(data: CreateTeamDTO, context: CreateContext): Promise<Team> {
            const team = await teamsRepository.create(data);

            await auditlogRepository.log({
                userId: context.userId,
                action: 'create',
                entity: 'Team',
                entityId: String(team.id),
                newData: team,
                ipAddress: context.ipAddress,
            });

            return team;
        }
    }
}