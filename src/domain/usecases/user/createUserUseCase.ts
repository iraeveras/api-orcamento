// FILE: src/domain/usecase/user/createUserUserCase.ts
import { IUserRepository } from '@/domain/repositories/userRepository';
import { User } from '@/domain/entities/User';

interface CreateUserDTO {
    name: string;
    email: string;
    password: string;
}

export function createUserUseCase(userRepository: IUserRepository) {
    return {
        async execute(data: CreateUserDTO): Promise<User> {
            // Aqui entram regras de negócio/validação
            return userRepository.create(data);
        }
    };
}