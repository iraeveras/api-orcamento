// FILE: src/domain/usecases/employee/listEmployeeUseCase.ts
import { IEmployeeRepository } from '@/domain/repositories/employeeRepository';

export function listEmployeeUseCase(employeeRepository: IEmployeeRepository) {
    return {
        async execute(companyId: number) {
            return employeeRepository.list(companyId);
        },
    };
}