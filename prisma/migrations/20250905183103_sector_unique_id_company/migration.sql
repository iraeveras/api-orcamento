/*
  Warnings:

  - A unique constraint covering the columns `[id,companyId]` on the table `Sector` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Sector_id_companyId_key" ON "public"."Sector"("id", "companyId");
