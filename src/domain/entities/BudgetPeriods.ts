export type BudgetPeriodStatus = 'open' | 'closed' | 'pending';

export interface BudgetPeriod {
    id?: number;
    year: number;
    companyId: number;
    startDate: Date;
    endDate: Date;
    status: BudgetPeriodStatus;
    description: string;
    closedBy?: string | null;
    closedAt?: Date | null;
    createdAt?: Date;
    updatedAt?: Date;
}