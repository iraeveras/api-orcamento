import { IOvertimeRepository } from '@/domain/repositories/overtimeRepository';
import { IAuditlogRepository } from '@/domain/repositories/auditlogRepository';

interface DeleteContext {
    userId: number;
    ipAddress: string;
}

export function deleteOvertimeUseCase(
    repo: IOvertimeRepository,
    audit: IAuditlogRepository
) {
    return {
        async execute(id: number, context: DeleteContext): Promise<void> {
            const old = await repo.findById(id);
            await repo.delete(id);
            await audit.log({
                userId: context.userId,
                action: 'delete',
                entity: 'Overtime',
                entityId: String(id),
                oldData: old,
                ipAddress: context.ipAddress,
            });
        },
    };
}