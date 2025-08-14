/*
  Warnings:

  - A unique constraint covering the columns `[matricula]` on the table `Employee` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Employee_matricula_key" ON "public"."Employee"("matricula");
