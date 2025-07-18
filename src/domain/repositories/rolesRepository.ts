import { Role } from "@/domain/entities/Role";

export interface IRolesRepository {
    create(data: Omit<Role, "id" | "createdAt" | "updatedAt">): Promise<Role>;
    update(id: number, data: Partial<Role>): Promise<Role>;
    findById(id: number): Promise<Role | null>;
    list(): Promise<Role[]>;
    delete(id: number): Promise<boolean>;
}