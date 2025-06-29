import { IEmployeeRepository } from '@/domain/repositories/employeeRepository';

export function listEmployeeUseCase(employeeRepository: IEmployeeRepository) {
    return {
        async execute() {
            return employeeRepository.list();
        }
    };
}