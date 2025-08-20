-- CreateTable
CREATE TABLE "public"."CostCenterPlan" (
    "id" SERIAL NOT NULL,
    "codPlanoCentroCusto" TEXT NOT NULL,
    "nomePlanoCentroCusto" TEXT NOT NULL,
    "companyId" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CostCenterPlan_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CostCenterPlan_companyId_codPlanoCentroCusto_key" ON "public"."CostCenterPlan"("companyId", "codPlanoCentroCusto");

-- AddForeignKey
ALTER TABLE "public"."CostCenterPlan" ADD CONSTRAINT "CostCenterPlan_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "public"."Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
