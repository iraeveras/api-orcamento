/*
  Warnings:

  - Made the column `costcenterId` on table `Employee` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."Employee" DROP CONSTRAINT "Employee_costcenterId_fkey";

-- AlterTable
ALTER TABLE "public"."Employee" ALTER COLUMN "costcenterId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Employee" ADD CONSTRAINT "Employee_costcenterId_fkey" FOREIGN KEY ("costcenterId") REFERENCES "public"."CostCenter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
