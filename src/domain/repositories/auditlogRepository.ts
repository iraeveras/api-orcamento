import { Auditlog } from '@/domain/entities/Auditlog';

export interface IAuditlogRepository {
    log(data: Omit<Auditlog, 'id' | 'createdAt'>): Promise<void>
}