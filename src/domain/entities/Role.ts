import { RolePermission } from "@/domain/entities/RolePermission";

export interface Role {
    id?: number;
    name: string;
    level: string;
    description: string;
    permissions?: RolePermission[];
    createdAt?: Date;
    updatedAt?: Date;
}