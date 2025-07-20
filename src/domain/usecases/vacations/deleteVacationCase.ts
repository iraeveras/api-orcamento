// FILE: src/domain/usecase/user/deleteVocationUserCase.ts
import { IVacationsRepository } from "@/domain/repositories/vacationsRepository";
import { IAuditlogRepository } from '@/domain/repositories/auditlogRepository';

interface DeleteContext {
    userId: number;
    ipAddress: string;
}

export function deleteVacationUseCase(
    vacationsRepository: IVacationsRepository,
    auditlogRepository: IAuditlogRepository
) {
    return {
        async execute(id: number, context: DeleteContext): Promise<void | boolean> {
            const oldVacation = await vacationsRepository.findById(id);
            if (!oldVacation) return false;

            await vacationsRepository.delete(id);
            await auditlogRepository.log({
                userId: context.userId,
                action: 'delete',
                entity: 'Vacation',
                entityId: String(id),
                oldData: oldVacation,
                ipAddress: context.ipAddress,
            });
        }
    };
}