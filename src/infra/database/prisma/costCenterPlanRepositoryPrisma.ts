// FILE: src/infra/database/prisma/costCenterPlanRepositoryPrisma.ts
import prisma from './client';
import {
    ICostCenterPlanRepository,
    CostCenterPlanFilters,
} from '@/domain/repositories/costCenterPlanRepository';
import { CostCenterPlan } from '@/domain/entities/CostCenterPlan';

// Normaliza o status lido do Prisma (string) para o union do domínio
function normalizeStatus(s: string): CostCenterPlan['status'] {
    return s === 'active' || s === 'inactive' ? s : 'active';
}

function toDomain(row: any): CostCenterPlan {
    if (!row) return row;
    return {
        id: row.id,
        codPlanoCentroCusto: row.codPlanoCentroCusto,
        nomePlanoCentroCusto: row.nomePlanoCentroCusto,
        companyId: row.companyId,
        status: normalizeStatus(row.status),
        createdAt: row.createdAt,
        updatedAt: row.updatedAt,
    };
}

export function costCenterPlanRepositoryPrisma(): ICostCenterPlanRepository {
    return {
        async create(data) {
            const created = await prisma.costCenterPlan.create({
                data: {
                    ...data, // union 'active' | 'inactive' é aceito por string do Prisma
                },
            });
            return toDomain(created);
        },

        async update(id, data) {
            const updated = await prisma.costCenterPlan.update({
                where: { id },
                data: {
                    ...data,
                },
            });
            return toDomain(updated);
        },

        async findById(id) {
            const found = await prisma.costCenterPlan.findUnique({ where: { id } });
            return found ? toDomain(found) : null;
        },

        async list(filters?: CostCenterPlanFilters) {
            const where: any = {};
            if (filters?.companyId !== undefined) where.companyId = filters.companyId;
            if (filters?.status) where.status = filters.status; // Prisma espera string
            if (filters?.search) {
                where.OR = [
                    { codPlanoCentroCusto: { contains: filters.search, mode: 'insensitive' } },
                    { nomePlanoCentroCusto: { contains: filters.search, mode: 'insensitive' } },
                ];
            }

            const rows = await prisma.costCenterPlan.findMany({
                where,
                orderBy: [{ companyId: 'asc' }, { codPlanoCentroCusto: 'asc' }],
            });

            return rows.map(toDomain);
        },

        async delete(id) {
            try {
                await prisma.costCenterPlan.delete({ where: { id } });
                return true;
            } catch {
                return false;
            }
        },
    };
}