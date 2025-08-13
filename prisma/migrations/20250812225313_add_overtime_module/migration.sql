-- CreateEnum
CREATE TYPE "public"."OvertimeStatus" AS ENUM ('open', 'closed', 'pending');

-- CreateTable
CREATE TABLE "public"."Overtime" (
    "id" SERIAL NOT NULL,
    "year" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "companyId" INTEGER NOT NULL,
    "costCenterId" INTEGER NOT NULL,
    "employeeId" INTEGER NOT NULL,
    "budgetPeriodId" INTEGER NOT NULL,
    "function" TEXT NOT NULL,
    "he50Qty" INTEGER NOT NULL DEFAULT 0,
    "he100Qty" INTEGER NOT NULL DEFAULT 0,
    "holidayDaysQty" INTEGER NOT NULL DEFAULT 0,
    "nightHoursQty" INTEGER NOT NULL DEFAULT 0,
    "normalHours" INTEGER NOT NULL DEFAULT 0,
    "overtime50" INTEGER NOT NULL DEFAULT 0,
    "overtime100" INTEGER NOT NULL DEFAULT 0,
    "holidayHours" INTEGER NOT NULL DEFAULT 0,
    "nightShiftHours" INTEGER NOT NULL DEFAULT 0,
    "overtime50Value" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "overtime100Value" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "he50Value" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "he100Value" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "holidayValue" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "nightShiftValue" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "nightValue" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "dsrValue" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "dsrNightValue" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "additionalValue" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "totalValue" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "budgetedAmount" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "previousYearTotal" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "variance" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "variancePercentage" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "justification" TEXT,
    "status" "public"."OvertimeStatus" NOT NULL DEFAULT 'open',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Overtime_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Overtime" ADD CONSTRAINT "Overtime_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "public"."Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Overtime" ADD CONSTRAINT "Overtime_costCenterId_fkey" FOREIGN KEY ("costCenterId") REFERENCES "public"."CostCenter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Overtime" ADD CONSTRAINT "Overtime_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "public"."Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Overtime" ADD CONSTRAINT "Overtime_budgetPeriodId_fkey" FOREIGN KEY ("budgetPeriodId") REFERENCES "public"."BudgetPeriod"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
