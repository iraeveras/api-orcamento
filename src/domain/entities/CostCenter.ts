export interface CostCenter {
    id?: number;
    name: string;
    code: string;
    companyId: number;
    departmentId: number;
    sectorId: number;
    status?: string;
    createdAt?: Date;
    updatedAt?: Date;
}