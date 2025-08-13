/*
  Warnings:

  - Made the column `monthlyHours` on table `Employee` required. This step will fail if there are existing NULL values in that column.
  - Made the column `workSchedule` on table `Employee` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."Employee" ALTER COLUMN "monthlyHours" SET NOT NULL,
ALTER COLUMN "workSchedule" SET NOT NULL;
