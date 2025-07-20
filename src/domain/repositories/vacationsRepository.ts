// FILE: src/domain/repositories/vacationsRepository.ts
import { Vacation } from "@/domain/entities/Vacation";

export interface IVacationsRepository {
    create(data: Omit<Vacation, "id" | "createdAt" | "updatedAt">): Promise<Vacation>;
    update(id: number, data: Partial<Vacation>): Promise<Vacation>;
    findById(id: number): Promise<Vacation | null>;
    list(): Promise<Vacation[]>;
    delete(id: number): Promise<boolean>;
}