export interface Team {
    id?: number;
    name: string;
    companyId: number;
    sectorId: number;
    leaderId: number;
    status?: string;
    createdAt?: Date;
    updatedAt?: Date;
}