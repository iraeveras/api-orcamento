/*
  Warnings:

  - Changed the type of `status` on the `BudgetPeriod` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "public"."BudgetPeriodStatus" AS ENUM ('open', 'closed', 'pending');

-- AlterTable
ALTER TABLE "public"."BudgetPeriod" DROP COLUMN "status",
ADD COLUMN     "status" "public"."BudgetPeriodStatus" NOT NULL;
