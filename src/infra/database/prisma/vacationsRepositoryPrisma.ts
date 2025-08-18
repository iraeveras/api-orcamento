// FILE: src/infra/database/prisma/vacationsRepositoryPrisma.ts
import prisma from "./client";
import { IVacationsRepository } from "@/domain/repositories/vacationsRepository";
import { Vacation } from "@/domain/entities/Vacation";
import { toDecimalTwoPlaces } from "@/shared/utils/toDecimalTwoPlaces";

function mapDecimal(v: any) {
    return v?.toNumber ? v.toNumber() : v;
}
function mapVacationOut(vacation: any): Vacation {
    return {
        ...vacation,
        baseSalary: mapDecimal(vacation.baseSalary),
        overtimeAverage: mapDecimal(vacation.overtimeAverage),
        vacationValue: mapDecimal(vacation.vacationValue),
        onethirdValue: mapDecimal(vacation.onethirdValue),
        abonoValue: mapDecimal(vacation.abonoValue),
        abonoOnethirdValue: mapDecimal(vacation.abonoOnethirdValue),
    };
}

export function vacationsRepositoryPrisma(): IVacationsRepository {
    return {
        async create(data) {
            const created = await prisma.vacation.create({ 
                data: {
                    ...data,
                    baseSalary: toDecimalTwoPlaces(data.baseSalary),
                    overtimeAverage: toDecimalTwoPlaces(data.overtimeAverage),
                    vacationValue: toDecimalTwoPlaces(data.vacationValue),
                    onethirdValue: toDecimalTwoPlaces(data.onethirdValue),
                    abonoValue: toDecimalTwoPlaces(data.abonoValue),
                    abonoOnethirdValue: toDecimalTwoPlaces(data.abonoOnethirdValue),
                },
                include: {
                    employee: true,
                    company: true,
                    sector: true,
                    budgetPeriod: true,
                }
            });
            return mapVacationOut(created);
        },
        
        async update(id, data) {
            const updated = await prisma.vacation.update({ 
                where: { id }, 
                data: {
                    ...data,
                    ...(data.baseSalary !== undefined && { baseSalary: toDecimalTwoPlaces(data.baseSalary) }),
                    ...(data.overtimeAverage !== undefined && { overtimeAverage: toDecimalTwoPlaces(data.overtimeAverage) }),
                    ...(data.vacationValue !== undefined && { vacationValue: toDecimalTwoPlaces(data.vacationValue) }),
                    ...(data.onethirdValue !== undefined && { onethirdValue: toDecimalTwoPlaces(data.onethirdValue) }),
                    ...(data.abonoValue !== undefined && { abonoValue: toDecimalTwoPlaces(data.abonoValue) }),
                    ...(data.abonoOnethirdValue !== undefined && { abonoOnethirdValue: toDecimalTwoPlaces(data.abonoOnethirdValue) }),
                },
                include: {
                    employee: true,
                    company: true,
                    sector: true,
                    budgetPeriod: true,
                }
            });

            return mapVacationOut(updated);
        },

        async findById(id) {
            const vacation = await prisma.vacation.findUnique({ 
                where: { id },
                include: {
                    employee: true,
                    company: true,
                    sector: true,
                    budgetPeriod: true,
                },
            });
            
            return vacation ? mapVacationOut(vacation) : null;
        },

        async list() {
            const vacations = await prisma.vacation.findMany({
                include: {
                    employee: true,
                    company: true,
                    sector: true,
                    budgetPeriod: true,
                },
            });
            return vacations.map(mapVacationOut);
        },

        async delete(id) {
            try {
                await prisma.vacation.delete({ where: { id } });
                return true;
            } catch {
                return false;
            }
        }
    };
}