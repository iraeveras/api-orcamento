import { z } from 'zod';

const statusEnum = z.enum(['open', 'closed', 'pending']);

export const createOvertimeSchema = z.object({
    year: z.number(),
    month: z.number().min(1).max(12),
    companyId: z.number(),
    costCenterId: z.number(),
    employeeId: z.number(),
    budgetPeriodId: z.number(),

    function: z.string().min(1),

    he50Qty: z.number().int().nonnegative().optional().default(0),
    he100Qty: z.number().int().nonnegative().optional().default(0),
    holidayDaysQty: z.number().int().nonnegative().optional().default(0),
    nightHoursQty: z.number().int().nonnegative().optional().default(0),

    normalHours: z.number().int().nonnegative().optional().default(0),
    overtime50: z.number().int().nonnegative().optional().default(0),
    overtime100: z.number().int().nonnegative().optional().default(0),
    holidayHours: z.number().int().nonnegative().optional().default(0),
    nightShiftHours: z.number().int().nonnegative().optional().default(0),

    overtime50Value: z.number().nonnegative().optional().default(0),
    overtime100Value: z.number().nonnegative().optional().default(0),
    he50Value: z.number().nonnegative().optional().default(0),
    he100Value: z.number().nonnegative().optional().default(0),
    holidayValue: z.number().nonnegative().optional().default(0),
    nightShiftValue: z.number().nonnegative().optional().default(0),
    nightValue: z.number().nonnegative().optional().default(0),
    dsrValue: z.number().nonnegative().optional().default(0),
    dsrNightValue: z.number().nonnegative().optional().default(0),
    additionalValue: z.number().nonnegative().optional().default(0),
    totalValue: z.number().nonnegative().optional().default(0),
    budgetedAmount: z.number().nonnegative().optional().default(0),
    previousYearTotal: z.number().nonnegative().optional().default(0),
    variance: z.number().optional().default(0),
    variancePercentage: z.number().optional().default(0),

    justification: z.string().optional().nullable(),

    status: statusEnum.optional().default('open'),
});

export const updateOvertimeSchema = createOvertimeSchema.partial();