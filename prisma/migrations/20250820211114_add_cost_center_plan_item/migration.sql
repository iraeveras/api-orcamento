-- CreateTable
CREATE TABLE "public"."CostCenterPlanItem" (
    "id" SERIAL NOT NULL,
    "planoCentroCustoId" INTEGER NOT NULL,
    "codPlanoCentroCustoItem" TEXT NOT NULL,
    "nomePlanoCentroCustoItem" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CostCenterPlanItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CostCenterPlanItem_planoCentroCustoId_codPlanoCentroCustoIt_key" ON "public"."CostCenterPlanItem"("planoCentroCustoId", "codPlanoCentroCustoItem");

-- AddForeignKey
ALTER TABLE "public"."CostCenterPlanItem" ADD CONSTRAINT "CostCenterPlanItem_planoCentroCustoId_fkey" FOREIGN KEY ("planoCentroCustoId") REFERENCES "public"."CostCenterPlan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
