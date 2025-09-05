/*
  Warnings:

  - A unique constraint covering the columns `[id,companyId]` on the table `Team` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Team_id_companyId_key" ON "public"."Team"("id", "companyId");
