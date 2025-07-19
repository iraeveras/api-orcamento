// FILE: src/domain/usecase/user/createUserUserCase.ts
import { IUserRepository } from '@/domain/repositories/userRepository';
import { IAuditlogRepository } from '@/domain/repositories/auditlogRepository';
import { User, UserResponse } from '@/domain/entities/User';

export interface CreateUserDTO {
    name: string;
    email: string;
    password: string;
    roleId: number;
    companyIds?: number[];
    status?: string;
}

interface UseCaseContext {
    userId: number;
    ipAddress?: string;
}

export function createUserUseCase(
    userRepository: IUserRepository, 
    auditlogRepository: IAuditlogRepository
) {
    return {
        async execute(data: CreateUserDTO, context: UseCaseContext): Promise<UserResponse> {
            // Aqui entram regras de negócio/validação
            const user = await userRepository.create(data);

            await auditlogRepository.log({
                userId: context.userId,
                action: 'create',
                entity: 'User',
                entityId: String(user.id),
                newData: {...user},
                ipAddress: context.ipAddress,
            });
            
            return user;
        }
    };
}