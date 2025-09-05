// FILE: src/domain/usecases/department/listDepartimentUseCase.ts
import { IDepartmentRepository } from '@/domain/repositories/departmentRepository';

export function listDepartmentUseCase(departmentRepository: IDepartmentRepository) {
    return {
        async execute(companyId: number) {
            return departmentRepository.list(companyId);
        },
    };
}