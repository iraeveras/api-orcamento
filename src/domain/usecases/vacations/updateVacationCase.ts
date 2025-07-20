// FILE: src/domain/usecase/user/updateVocationUserCase.ts
import { IVacationsRepository } from "@/domain/repositories/vacationsRepository";
import { IAuditlogRepository } from '@/domain/repositories/auditlogRepository';
import { Vacation } from "@/domain/entities/Vacation";

interface UpdateContext {
    userId: number;
    ipAddress: string;
}

export function updateVacationUseCase(
    vacationsRepository: IVacationsRepository,
    auditlogRepository: IAuditlogRepository
) {
    return {
        async execute(id: number, data: Partial<Vacation>, context: UpdateContext): Promise<Vacation | null> {
            const oldVacation = await vacationsRepository.findById(id);
            if (!oldVacation) return null;

            const updated = {
                ...data,
                ...(data.acquisitionPeriodStart && { acquisitionPeriodStart: new Date(data.acquisitionPeriodStart) }),
                ...(data.acquisitionPeriodEnd && { acquisitionPeriodEnd: new Date(data.acquisitionPeriodEnd) }),
            };

            const vacation = await vacationsRepository.update(id, updated);

            await auditlogRepository.log({
                userId: context.userId,
                action: 'update',
                entity: 'Vacation',
                entityId: String(id),
                oldData: oldVacation,
                newData: updated,
                ipAddress: context.ipAddress,
            });
            
            return vacation;
        }
    };
}