-- CreateTable
CREATE TABLE "Company" (
    "id" SERIAL NOT NULL,
    "cnpl" TEXT NOT NULL,
    "corporateName" TEXT NOT NULL,
    "tradename" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);
