import prisma from "./client";
import { IAuditlogRepository } from "@/domain/repositories/auditlogRepository";
import { Auditlog } from "@/domain/entities/Auditlog";

export function auditlogRepositoryPrisma(): IAuditlogRepository {
    return {
        async log(data: Omit<Auditlog, 'id' | 'createdAt'>): Promise<void> {
            await prisma.auditlog.create({ data });
        }
    };
}