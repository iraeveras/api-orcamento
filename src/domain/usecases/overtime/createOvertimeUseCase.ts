import { IOvertimeRepository } from '@/domain/repositories/overtimeRepository';
import { IAuditlogRepository } from '@/domain/repositories/auditlogRepository';
import { Overtime } from '@/domain/entities/Overtime';

interface CreateContext {
    userId: number;
    ipAddress: string;
}

export function createOvertimeUseCase(
    repo: IOvertimeRepository,
    audit: IAuditlogRepository
) {
    return {
        async execute(data: Overtime, context: CreateContext): Promise<Overtime> {
            const overtime = await repo.create(data);
            await audit.log({
                userId: context.userId,
                action: 'create',
                entity: 'Overtime',
                entityId: String(overtime.id),
                newData: overtime,
                ipAddress: context.ipAddress,
            });
            return overtime;
        },
    };
}