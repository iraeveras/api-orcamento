// FILE: src/domain/entities/ExpenseSubtype.ts
export type ExpenseSubtypeStatus = 'active' | 'inactive';

export interface ExpenseSubtype {
    id?: number;
    tipoDespesaId: number;
    codSubtipoDespesa: string;
    nomeSubtipoDespesa: string;
    status: ExpenseSubtypeStatus;
    createdAt?: Date;
    updatedAt?: Date;
}