-- CreateTable
CREATE TABLE "public"."ExpenseSubtype" (
    "id" SERIAL NOT NULL,
    "tipoDespesaId" INTEGER NOT NULL,
    "codSubtipoDespesa" TEXT NOT NULL,
    "nomeSubtipoDespesa" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ExpenseSubtype_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ExpenseSubtype_tipoDespesaId_codSubtipoDespesa_key" ON "public"."ExpenseSubtype"("tipoDespesaId", "codSubtipoDespesa");

-- AddForeignKey
ALTER TABLE "public"."ExpenseSubtype" ADD CONSTRAINT "ExpenseSubtype_tipoDespesaId_fkey" FOREIGN KEY ("tipoDespesaId") REFERENCES "public"."ExpenseType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
