-- CreateTable
CREATE TABLE "Vacation" (
    "id" SERIAL NOT NULL,
    "employeeId" INTEGER NOT NULL,
    "companyId" INTEGER NOT NULL,
    "sectorId" INTEGER NOT NULL,
    "acquisitionPeriodStart" TIMESTAMP(3) NOT NULL,
    "acquisitionPeriodEnd" TIMESTAMP(3) NOT NULL,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "vacationDays" INTEGER NOT NULL,
    "abonoDays" INTEGER NOT NULL,
    "thirteenthAdvance" BOOLEAN NOT NULL,
    "baseSalary" DECIMAL(65,30) NOT NULL,
    "overtimeAverage" DECIMAL(65,30) NOT NULL,
    "vacationValue" DECIMAL(65,30) NOT NULL,
    "onethirdValue" DECIMAL(65,30) NOT NULL,
    "abonoValue" DECIMAL(65,30) NOT NULL,
    "abonoOnethirdValue" DECIMAL(65,30) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'scheduled',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Vacation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Vacation" ADD CONSTRAINT "Vacation_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vacation" ADD CONSTRAINT "Vacation_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vacation" ADD CONSTRAINT "Vacation_sectorId_fkey" FOREIGN KEY ("sectorId") REFERENCES "Sector"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
