import { User, UserResponse } from '@/domain/entities/User';

interface PrismaUser {
    id: number;
    name: string;
    email: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    lastLogin: Date | null;
    roleId: number;
    role?: {
        id: number;
        name: string;
        level: string;
        description: string;
        permissions: any[]; // ajuste com o tipo real das permissões, se disponível
    } | null;
    companies: {
        company: {
            id: number;
            cnpj: string;
            corporateName: string;
            tradeName: string;
            status: string;
            createdAt: Date;
            updatedAt: Date;
        };
    }[];
}

export function formatUserResponse(user: PrismaUser): UserResponse {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        status: user.status,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        lastLogin: user.lastLogin,
        roleId: user.roleId,
        role: user.role ? {
            id: user.role.id,
            name: user.role.name,
            level: user.role.level,
            description: user.role.description,
            permissions: user.role.permissions,
        } : undefined,
        companies: user.companies.map((uc) => ({
            id: uc.company.id,
            cnpj: uc.company.cnpj,
            corporateName: uc.company.corporateName,
            tradeName: uc.company.tradeName,
            status: uc.company.status,
            createdAt: uc.company.createdAt,
            updatedAt: uc.company.updatedAt,
        })),
    };
}