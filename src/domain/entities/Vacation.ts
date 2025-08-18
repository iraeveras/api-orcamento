// FILE: src/domain/entities/Vacation.ts
export interface Vacation {
    id?: number;
    employeeId: number;
    companyId: number;
    sectorId: number;
    budgetPeriodId: number;
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
    status?: string;
    createdAt?: Date;
    updatedAt?: Date;
}