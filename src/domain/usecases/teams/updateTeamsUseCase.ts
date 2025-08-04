// FILE: src/domain/usecases/teams/updateTeamsUseCase.ts
import { ITeamsRepository } from '@/domain/repositories/teamsRepository';
import { IAuditlogRepository } from '@/domain/repositories/auditlogRepository';
import { Team } from '@/domain/entities/Teams';

interface UpdateContext {
    userId: number;
    ipAddress: string;
}

export function updateTeamsUseCase(
    teamsRepository: ITeamsRepository,
    auditlogRepository: IAuditlogRepository
) {
    return {
        async execute(id: number, data: Partial<Team>, context: UpdateContext): Promise<Team> {
            const old = await teamsRepository.findById(id);
            const updated = await teamsRepository.update(id, data);

            await auditlogRepository.log({
                userId: context.userId,
                action: 'update',
                entity: 'Team',
                entityId: String(id),
                oldData: old,
                newData: updated,
                ipAddress: context.ipAddress,
            });

            return updated;
        }
    }
}