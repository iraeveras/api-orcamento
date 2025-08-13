//FILE: src/domain/entities/Employee.ts
export interface Employee {
    id?: number;
    matricula: string;
    name: string;
    admission: Date | string;
    position: string;
    salary: number;
    dangerPay: boolean;
    monthlyHours: number;
    workSchedule: string;
    status?: string;
    companyId: number;
    departmentId: number;
    sectorId: number;
    teams?: number[];
    createdAt?: Date;
    updatedAt?: Date;
}