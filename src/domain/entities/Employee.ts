export interface Employee {
    id?: number;
    matricula: string;
    name: string;
    admission: Date | string;
    position: string;
    salary: number;
    dangerPay: boolean;
    status?: string;
    companyId: number;
    departmentId: number;
    sectorId: number;
    createdAt?: Date;
    updatedAt?: Date;
}