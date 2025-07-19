// FILE: src/domain/entities/User.ts
import { Role } from '@/domain/entities/Role';
import { Company } from '@/domain/entities/Company';

export interface User {
    id?: number;
    name: string;
    email: string;
    password: string; // omitido em listagem
    roleId: number;
    role?: Role;
    companies?: {
        id: number;
        cnpj: string;
        corporateName: string;
        tradeName: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
    }[];
    status?: string;
    lastLogin?: Date | null;
    createdAt?: Date;
    updatedAt?: Date;
}

export type UserResponse = Omit<User, 'password'>; // Senha sempre omitida no retorno