export interface Auditlog {
    id: number;
    userId: number;
    action: string;
    entity: string;
    entityId?: string;
    oldData?: any;
    newData?: any;
    ipAddress?: string;
    createdAt: Date;
}