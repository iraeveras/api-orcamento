/*
  Warnings:

  - A unique constraint covering the columns `[companyId,year]` on the table `BudgetPeriod` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `budgetPeriodId` to the `Vacation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Vacation" ADD COLUMN     "budgetPeriodId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "BudgetPeriod_companyId_year_key" ON "public"."BudgetPeriod"("companyId", "year");

-- AddForeignKey
ALTER TABLE "public"."Vacation" ADD CONSTRAINT "Vacation_budgetPeriodId_fkey" FOREIGN KEY ("budgetPeriodId") REFERENCES "public"."BudgetPeriod"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
