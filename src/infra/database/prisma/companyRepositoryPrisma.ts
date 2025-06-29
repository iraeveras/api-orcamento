// src/infra/database/prisma/companyRepositoryPrisma.ts
import prisma from './client';
import { ICompanyRepository } from '@/domain/repositories/companyRepository';
import { Company } from '@/domain/entities/Company';

export function companyRepositoryPrisma(): ICompanyRepository {
    return {
        async create(data) {
            const created = await prisma.company.create({ 
                data: {
                    cnpj: data.cnpj,
                    corporateName: data.corporateName,
                    tradeName: data.tradeName,
                    status: data.status ?? 'active',
                },
            });

            return {
                id: created.id,
                cnpj: created.cnpj,
                corporateName: created.corporateName,
                tradeName: created.tradeName,
                status: created.status,
                createdAt: created.createdAt,
                updatedAt: created.updatedAt,
            }
        },
        async update(id, data) {
            const updated = await prisma.company.update({ where: { id }, data });
            return {
                id: updated.id,
                cnpj: updated.cnpj,
                corporateName: updated.corporateName,
                tradeName: updated.tradeName,
                status: updated.status,
                createdAt: updated.createdAt,
                updatedAt: updated.updatedAt,
            }
        },
        async findById(id) {
            const found = await prisma.company.findUnique({ where: { id } });
            if (!found) return null;
            return {
                id: found.id,
                cnpj: found.cnpj,
                corporateName: found.corporateName,
                tradeName: found.tradeName,
                status: found.status,
                createdAt: found.createdAt,
                updatedAt: found.updatedAt,
            }
        },
        async list() {
            const list = await prisma.company.findMany();
            return list.map(item => ({
                id: item.id,
                cnpj: item.cnpj,
                corporateName: item.corporateName,
                tradeName: item.tradeName,
                status: item.status,
                createdAt: item.createdAt,
                updatedAt: item.updatedAt,
            }))
        },
        async delete(id) {
            try {
                await prisma.company.delete({ where: { id } });
                return true;
            } catch {
                return false;
            }
        }
    };
}
