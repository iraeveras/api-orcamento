// FILE: src/domain/usecases/sector/listSectorUseCase.ts
import { ISectorRepository } from '@/domain/repositories/sectorRepository';
import { Sector } from '@/domain/entities/Sector';

export function listSectorUseCase(sectorRepository: ISectorRepository) {
    return {
        async execute(companyId: number): Promise<Sector[]> {
            return sectorRepository.list(companyId);
        },
    };
}