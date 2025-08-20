export type ExpenseTypeStatus = 'active' | 'inactive';

export interface ExpenseType {
    id?: number;
    planoCentroCustoItemId: number;
    codTipoDespesa: string;
    nomeTipoDespesa: string;
    status: ExpenseTypeStatus;
    createdAt?: Date;
    updatedAt?: Date;
}