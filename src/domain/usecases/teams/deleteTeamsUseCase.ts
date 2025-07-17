// deleteTeamsUseCase.ts
import { ITeamsRepository } from '@/domain/repositories/teamsRepository';
import { IAuditlogRepository } from '@/domain/repositories/auditlogRepository';

interface DeleteContext {
    userId: number;
    ipAddress: string;
}

export function deleteTeamsUseCase(
    teamsRepository: ITeamsRepository,
    auditlogRepository: IAuditlogRepository
) {
    return {
        async execute(id: number, context: DeleteContext): Promise<void> {
            const old = await teamsRepository.findById(id);
            await teamsRepository.delete(id);

            await auditlogRepository.log({
                userId: context.userId,
                action: 'delete',
                entity: 'Team',
                entityId: String(id),
                oldData: old,
                ipAddress: context.ipAddress,
            });
        }
    }
}