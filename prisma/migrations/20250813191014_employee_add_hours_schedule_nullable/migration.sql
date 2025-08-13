/*
  Warnings:

  - Added the required column `monthlyHours` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `workSchedule` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Employee" ADD COLUMN     "monthlyHours" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "workSchedule" TEXT NOT NULL;
