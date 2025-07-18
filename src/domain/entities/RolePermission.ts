export interface RolePermission {
    id?: number;
    module: string;
    actions: string[];
    scope: string;
    roleId?: number;
    createdAt?: Date;
    updatedAt?: Date;
}