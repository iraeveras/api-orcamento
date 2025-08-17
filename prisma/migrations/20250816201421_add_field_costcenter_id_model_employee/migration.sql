-- AlterTable
ALTER TABLE "public"."Employee" ADD COLUMN     "costcenterId" INTEGER;

-- AddForeignKey
ALTER TABLE "public"."Employee" ADD CONSTRAINT "Employee_costcenterId_fkey" FOREIGN KEY ("costcenterId") REFERENCES "public"."CostCenter"("id") ON DELETE SET NULL ON UPDATE CASCADE;
