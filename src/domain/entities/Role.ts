import { RolePermission } from "@/domain/entities/RolePermission";
import { User } from '@/domain/entities/User'

export interface Role {
    id?: number;
    name: string;
    level: string;
    description: string;
    permissions?: RolePermission[];
    users?: User[];
    createdAt?: Date;
    updatedAt?: Date;
}