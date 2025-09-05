/*
  Warnings:

  - A unique constraint covering the columns `[id,companyId]` on the table `Department` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Department_id_companyId_key" ON "public"."Department"("id", "companyId");
