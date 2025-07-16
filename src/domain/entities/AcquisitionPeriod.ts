export interface AcquisitionPeriod {
    id?: number;
    employeeId: number;
    startDate: Date | string;
    endDate: Date | string;
    year: number;
    status?: string;
    createdAt?: Date;
    updatedAt?: Date;
}