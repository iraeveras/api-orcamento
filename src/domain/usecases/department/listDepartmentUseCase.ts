import { IDepartmentRepository } from '@/domain/repositories/departmentRepository';

export function listDepartmentUseCase(departmentRepository: IDepartmentRepository) {
    return {
        async execute() {
            return departmentRepository.list();
        }
    };
}