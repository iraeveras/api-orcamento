import { IRolesRepository } from "@/domain/repositories/rolesRepository";
import { IAuditlogRepository } from '@/domain/repositories/auditlogRepository';
import { Role } from "@/domain/entities/Role";

interface UpdateContext {
    userId: number;
    ipAddress: string;
}

export function updateRoleUseCase(
    rolesRepository: IRolesRepository,
    auditlogRepository: IAuditlogRepository,
) {
    return {
        async execute(id: number, data: Partial<Role>, context: UpdateContext): Promise<Role> {
            const old = await rolesRepository.findById(id);
            const updated = await rolesRepository.update(id, data);

            await auditlogRepository.log({
                userId: context.userId,
                action: 'update',
                entity: 'Role',
                entityId: String(id),
                oldData: old,
                newData: updated,
                ipAddress: context.ipAddress,
            });
            
            return updated;
        }
    };
}