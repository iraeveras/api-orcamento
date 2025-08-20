import prisma from './client';
import {
    ICostCenterPlanItemRepository,
    CostCenterPlanItemFilters,
} from '@/domain/repositories/costCenterPlanItemRepository';
import { CostCenterPlanItem } from '@/domain/entities/CostCenterPlanItem';

// mapeia string do Prisma -> union do domínio
function normalizeStatus(s: string): CostCenterPlanItem['status'] {
    return s === 'inactive' ? 'inactive' : 'active';
}

function toDomain(row: any): CostCenterPlanItem {
    if (!row) return row;
    return {
        id: row.id,
        planoCentroCustoId: row.planoCentroCustoId,
        codPlanoCentroCustoItem: row.codPlanoCentroCustoItem,
        nomePlanoCentroCustoItem: row.nomePlanoCentroCustoItem,
        status: normalizeStatus(row.status),
        createdAt: row.createdAt,
        updatedAt: row.updatedAt,
    };
}

export function costCenterPlanItemRepositoryPrisma(): ICostCenterPlanItemRepository {
    return {
        async create(data) {
            const created = await prisma.costCenterPlanItem.create({
                data: { ...data }, // union compatível com string
            });
            return toDomain(created);
        },

        async update(id, data) {
            const updated = await prisma.costCenterPlanItem.update({
                where: { id },
                data: { ...data },
            });
            return toDomain(updated);
        },

        async findById(id) {
            const found = await prisma.costCenterPlanItem.findUnique({ where: { id } });
            return found ? toDomain(found) : null;
        },

        async list(filters?: CostCenterPlanItemFilters) {
            const where: any = {};
            if (filters?.planoCentroCustoId !== undefined) where.planoCentroCustoId = filters.planoCentroCustoId;
            if (filters?.status) where.status = filters.status;
            if (filters?.search) {
                where.OR = [
                    { codPlanoCentroCustoItem: { contains: filters.search, mode: 'insensitive' } },
                    { nomePlanoCentroCustoItem: { contains: filters.search, mode: 'insensitive' } },
                ];
            }

            const rows = await prisma.costCenterPlanItem.findMany({
                where,
                orderBy: [{ planoCentroCustoId: 'asc' }, { codPlanoCentroCustoItem: 'asc' }],
            });

            return rows.map(toDomain);
        },

        async delete(id) {
            try {
                await prisma.costCenterPlanItem.delete({ where: { id } });
                return true;
            } catch {
                return false;
            }
        },
    };
}