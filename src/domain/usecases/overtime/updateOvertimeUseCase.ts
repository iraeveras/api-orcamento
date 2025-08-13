import { IOvertimeRepository } from '@/domain/repositories/overtimeRepository';
import { IAuditlogRepository } from '@/domain/repositories/auditlogRepository';
import { Overtime } from '@/domain/entities/Overtime';

interface UpdateContext {
    userId: number;
    ipAddress: string;
}

export function updateOvertimeUseCase(
    repo: IOvertimeRepository,
    audit: IAuditlogRepository
) {
    return {
        async execute(id: number, data: Partial<Overtime>, context: UpdateContext): Promise<Overtime> {
            const old = await repo.findById(id);
            const updated = await repo.update(id, data);
            await audit.log({
                userId: context.userId,
                action: 'update',
                entity: 'Overtime',
                entityId: String(id),
                oldData: old,
                newData: updated,
                ipAddress: context.ipAddress,
            });
            return updated;
        },
    };
}