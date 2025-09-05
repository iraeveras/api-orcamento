/*
  Warnings:

  - A unique constraint covering the columns `[id,companyId]` on the table `CostCenterPlan` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CostCenterPlan_id_companyId_key" ON "public"."CostCenterPlan"("id", "companyId");
