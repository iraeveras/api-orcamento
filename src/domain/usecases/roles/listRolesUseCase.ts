import { IRolesRepository } from "@/domain/repositories/rolesRepository";
import { Role } from "@/domain/entities/Role";

export function listRolesUseCase(rolesRepository: IRolesRepository) {
    return {
        async execute(): Promise<Role[]> {
            return rolesRepository.list();
        }
    };
}