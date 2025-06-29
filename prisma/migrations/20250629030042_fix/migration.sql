/*
  Warnings:

  - You are about to drop the column `cnpl` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `tradename` on the `Company` table. All the data in the column will be lost.
  - Added the required column `cnpj` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tradeName` to the `Company` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Company" DROP COLUMN "cnpl",
DROP COLUMN "tradename",
ADD COLUMN     "cnpj" TEXT NOT NULL,
ADD COLUMN     "tradeName" TEXT NOT NULL;
