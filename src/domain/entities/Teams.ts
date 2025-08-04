// FILE: src/domain/entities/Teams.ts
export interface Team {
    id?: number;
    name: string;
    companyId: number;
    sectorId: number;
    leaderId: number;
    members?: number[];
    status?: string;
    createdAt?: Date;
    updatedAt?: Date;
}