// FILE: src/infra/database/prisma/costCenterPlanRepositoryPrisma.ts
import prisma from './client';
import {
    ICostCenterPlanRepository,
    CostCenterPlanFilters,
} from '@/domain/repositories/costCenterPlanRepository';
import { CostCenterPlan } from '@/domain/entities/CostCenterPlan';

// Normaliza string do Prisma para union do domínio
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
                data: { ...data },
            });
            return toDomain(created);
        },

        async update(id, companyId, data) {
            const updated = await prisma.costCenterPlan.update({
                where: { id_companyId: { id, companyId } },
                data: { ...data },
            });
            return toDomain(updated);
        },

        async findById(id, companyId) {
            const found = await prisma.costCenterPlan.findUnique({
                where: { id_companyId: { id, companyId } },
            });
            return found ? toDomain(found) : null;
        },

        async list(companyId, filters) {
            const where: any = { companyId };
            if (filters?.status) where.status = filters.status;
            if (filters?.search) {
                where.OR = [
                    { codPlanoCentroCusto: { contains: filters.search, mode: 'insensitive' } },
                    { nomePlanoCentroCusto: { contains: filters.search, mode: 'insensitive' } },
                ];
            }

            const rows = await prisma.costCenterPlan.findMany({
                where,
                orderBy: [{ codPlanoCentroCusto: 'asc' }],
            });

            return rows.map(toDomain);
        },

        async delete(id, companyId) {
            try {
                await prisma.costCenterPlan.delete({ where: { id_companyId: { id, companyId } } });
                return true;
            } catch {
                return false;
            }
        },
    };
}