-- CreateTable
CREATE TABLE "public"."ExpenseType" (
    "id" SERIAL NOT NULL,
    "planoCentroCustoItemId" INTEGER NOT NULL,
    "codTipoDespesa" TEXT NOT NULL,
    "nomeTipoDespesa" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ExpenseType_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ExpenseType_planoCentroCustoItemId_codTipoDespesa_key" ON "public"."ExpenseType"("planoCentroCustoItemId", "codTipoDespesa");

-- AddForeignKey
ALTER TABLE "public"."ExpenseType" ADD CONSTRAINT "ExpenseType_planoCentroCustoItemId_fkey" FOREIGN KEY ("planoCentroCustoItemId") REFERENCES "public"."CostCenterPlanItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
