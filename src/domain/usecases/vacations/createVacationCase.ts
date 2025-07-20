// FILE: src/domain/usecase/user/createVocationUserCase.ts
import { IVacationsRepository } from "@/domain/repositories/vacationsRepository";
import { Vacation } from "@/domain/entities/Vacation";
import { IAuditlogRepository } from "@/domain/repositories/auditlogRepository";

interface CreateVacationDTO {
    employeeId: number;
    companyId: number;
    acquisitionPeriodStart: Date;
    acquisitionPeriodEnd: Date;
    month: number;
    year: number;
    vacationDays: number;
    abonoDays: number;
    thirteenthAdvance: boolean;
    baseSalary: number;
    overtimeAverage: number;
    vacationValue: number;
    onethirdValue: number;
    abonoValue: number;
    abonoOnethirdValue: number;
    status: string;
    sectorId: number;
}

interface CreateContext {
    userId: number;
    ipAddress: string;
}

export function createVacationUseCase(
    vacationsRepository: IVacationsRepository,
    auditlogRepository: IAuditlogRepository
) {
    return {
        async execute(data: CreateVacationDTO, context: CreateContext): Promise<Vacation> {
            const vacation = await vacationsRepository.create({
                ...data,
                acquisitionPeriodStart: new Date(data.acquisitionPeriodStart),
                acquisitionPeriodEnd: new Date(data.acquisitionPeriodEnd),
            });
            await auditlogRepository.log({
                userId: context.userId,
                action: 'create',
                entity: 'Vacation',
                entityId: String(vacation.id),
                newData: vacation,
                ipAddress: context.ipAddress,
            });
            return vacation;
        }
    };
}
