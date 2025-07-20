// FILE: src/domain/usecase/user/listVocationUserCase.ts
import { IVacationsRepository } from "@/domain/repositories/vacationsRepository";
import { Vacation } from "@/domain/entities/Vacation";

export function listVacationsUseCase(vacationsRepository: IVacationsRepository) {
    return {
        async execute(): Promise<Vacation[]> {
            return await vacationsRepository.list();
        }
    };
}