// FILE: src/domain/entities/Sector.ts
export interface Sector {
    id?: number;
    name: string;
    companyId: number;
    departmentId: number;
    status: string;
    createdAt?: Date;
    updatedAt?: Date;
}