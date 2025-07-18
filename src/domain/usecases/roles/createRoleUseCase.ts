import { IRolesRepository } from "@/domain/repositories/rolesRepository";
import { Role } from "@/domain/entities/Role";
import { IAuditlogRepository } from "@/domain/repositories/auditlogRepository";

interface CreateRoleDTO {
    name: string;
    level: string;
    description: string;
    permissions: any[]; // tipar corretamente se necessário
}

interface CreateContext {
    userId: number;
    ipAddress: string;
}

export function createRoleUseCase(
    rolesRepository: IRolesRepository,
    auditlogRepository: IAuditlogRepository,
) {
    return {
        async execute(data: CreateRoleDTO, context: CreateContext): Promise<Role> {
            const role = await rolesRepository.create(data);

            // Log de auditoria
            await auditlogRepository.log({
                userId: context.userId,
                action: "create",
                entity: "Role",
                entityId: String(role.id),
                newData: role,
                ipAddress: context.ipAddress,
            });

            return role;
        },
    };
}