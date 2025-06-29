import { ISectorRepository } from '@/domain/repositories/sectorRepository';
import { Sector } from '@/domain/entities/Sector';

export function listSectorUseCase(sectorRepository: ISectorRepository) {
    return {
        async execute(): Promise<Sector[]> {
            return sectorRepository.list();
        },
    };
}
