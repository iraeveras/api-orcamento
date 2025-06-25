import { IUserRepository } from '@/domain/repositories/userRepository';
import { User } from '@/domain/entities/User';

export function listUsersUseCase(userRepository: IUserRepository) {
    return {
        async execute(): Promise<User[]> {
            return userRepository.list();
        }
    };
}
