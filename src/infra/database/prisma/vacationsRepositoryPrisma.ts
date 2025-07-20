// FILE: src/infra/database/prisma/vacationsRepositoryPrisma.ts
import prisma from "./client";
import { IVacationsRepository } from "@/domain/repositories/vacationsRepository";
import { Vacation } from "@/domain/entities/Vacation";
import { toDecimalTwoPlaces } from "@/shared/utils/toDecimalTwoPlaces";

export function vacationsRepositoryPrisma(): IVacationsRepository {
    return {
        async create(data) {
            const vacation = await prisma.vacation.create({ 
                data: {
                    ...data,
                    baseSalary: toDecimalTwoPlaces(data.baseSalary),
                    overtimeAverage: toDecimalTwoPlaces(data.overtimeAverage),
                    vacationValue: toDecimalTwoPlaces(data.vacationValue),
                    onethirdValue: toDecimalTwoPlaces(data.onethirdValue),
                    abonoValue: toDecimalTwoPlaces(data.abonoValue),
                    abonoOnethirdValue: toDecimalTwoPlaces(data.abonoOnethirdValue),
                }
            });
            return {
                ...vacation,
                baseSalary: vacation.baseSalary.toNumber(),
                overtimeAverage: vacation.overtimeAverage.toNumber(),
                vacationValue: vacation.vacationValue.toNumber(),
                onethirdValue: vacation.onethirdValue.toNumber(),
                abonoValue: vacation.abonoValue.toNumber(),
                abonoOnethirdValue: vacation.abonoOnethirdValue.toNumber(),
            };
        },
        
        async update(id, data) {
            const vacation = await prisma.vacation.update({ 
                where: { id }, 
                data: {
                    ...data,
                    ...(data.baseSalary && { baseSalary: toDecimalTwoPlaces(data.baseSalary) }),
                    ...(data.overtimeAverage && { overtimeAverage: toDecimalTwoPlaces(data.overtimeAverage) }),
                    ...(data.vacationValue && { vacationValue: toDecimalTwoPlaces(data.vacationValue) }),
                    ...(data.onethirdValue && { onethirdValue: toDecimalTwoPlaces(data.onethirdValue) }),
                    ...(data.abonoValue && { abonoValue: toDecimalTwoPlaces(data.abonoValue) }),
                    ...(data.abonoOnethirdValue && { abonoOnethirdValue: toDecimalTwoPlaces(data.abonoOnethirdValue) }),
                }
            });

            return {
                ...vacation,
                baseSalary: vacation.baseSalary.toNumber(),
                overtimeAverage: vacation.overtimeAverage.toNumber(),
                vacationValue: vacation.vacationValue.toNumber(),
                onethirdValue: vacation.onethirdValue.toNumber(),
                abonoValue: vacation.abonoValue.toNumber(),
                abonoOnethirdValue: vacation.abonoOnethirdValue.toNumber(),
            };
        },

        async findById(id) {
            const vacation = await prisma.vacation.findUnique({ where: { id } });
            if (!vacation) return null;
            return {
                ...vacation,
                baseSalary: vacation.baseSalary.toNumber(),
                overtimeAverage: vacation.overtimeAverage.toNumber(),
                vacationValue: vacation.vacationValue.toNumber(),
                onethirdValue: vacation.onethirdValue.toNumber(),
                abonoValue: vacation.abonoValue.toNumber(),
                abonoOnethirdValue: vacation.abonoOnethirdValue.toNumber(),
            };
        },

        async list() {
            const vacations = await prisma.vacation.findMany();
            return vacations.map(vacation => ({
                ...vacation,
                baseSalary: vacation.baseSalary.toNumber(),
                overtimeAverage: vacation.overtimeAverage.toNumber(),
                vacationValue: vacation.vacationValue.toNumber(),
                onethirdValue: vacation.onethirdValue.toNumber(),
                abonoValue: vacation.abonoValue.toNumber(),
                abonoOnethirdValue: vacation.abonoOnethirdValue.toNumber(),
            }));
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