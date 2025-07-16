import { AcquisitionPeriod } from '@/domain/entities/AcquisitionPeriod';

export interface IAcquisitionPeriodRepository {
    create(data: Omit<AcquisitionPeriod, 'id' | 'createdAt' | 'updatedAt'>): Promise<AcquisitionPeriod>;
    findById(id: number): Promise<AcquisitionPeriod | null>;
    list(): Promise<AcquisitionPeriod[]>;
    update(id: number, data: Partial<AcquisitionPeriod>): Promise<AcquisitionPeriod>;
    delete(id: number): Promise<boolean>;
}