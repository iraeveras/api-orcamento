import { IOvertimeRepository } from '@/domain/repositories/overtimeRepository';

export function listOvertimeUseCase(repo: IOvertimeRepository) {
    return {
        async execute() {
            return repo.list();
        },
    };
}