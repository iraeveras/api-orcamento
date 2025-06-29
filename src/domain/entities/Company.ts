// src/domain/entities/Company.ts
export interface Company {
    id?: number;
    cnpj: string;
    corporateName: string;
    tradeName: string;
    status: string;
    createdAt?: Date;
    updatedAt?: Date;
}