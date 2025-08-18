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

            const updatedPayload = {
                ...data,
                ...(data.acquisitionPeriodStart && {
                    acquisitionPeriodStart: 
                        data.acquisitionPeriodStart instanceof Date 
                            ? data.acquisitionPeriodStart 
                            : new Date(data.acquisitionPeriodStart) 
                }),
                ...(data.acquisitionPeriodEnd && { 
                    acquisitionPeriodEnd: 
                        data.acquisitionPeriodEnd instanceof Date 
                            ? data.acquisitionPeriodEnd 
                            : new Date(data.acquisitionPeriodEnd) 
                }),
            };

            const vacation = await vacationsRepository.update(id, updatedPayload);

            await auditlogRepository.log({
                userId: context.userId,
                action: 'update',
                entity: 'Vacation',
                entityId: String(id),
                oldData: oldVacation,
                newData: updatedPayload,
                ipAddress: context.ipAddress,
            });
            
            return vacation;
        }
    };
}