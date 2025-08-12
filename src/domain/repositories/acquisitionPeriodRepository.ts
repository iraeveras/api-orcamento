import { AcquisitionPeriod } from '@/domain/entities/AcquisitionPeriod';

export type AcquisitionPeriodFilters = {
    employeeId?: number;
    status?: string;
}

export interface IAcquisitionPeriodRepository {
    create(data: Omit<AcquisitionPeriod, 'id' | 'createdAt' | 'updatedAt'>): Promise<AcquisitionPeriod>;
    findById(id: number): Promise<AcquisitionPeriod | null>;
    list(filters?: AcquisitionPeriodFilters): Promise<AcquisitionPeriod[]>;
    update(id: number, data: Partial<AcquisitionPeriod>): Promise<AcquisitionPeriod>;
    delete(id: number): Promise<boolean>;
}