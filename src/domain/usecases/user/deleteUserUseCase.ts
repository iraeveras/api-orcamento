import { IUserRepository } from '@/domain/repositories/userRepository';

export function makeDeleteUserUseCase(userRepository: IUserRepository) {
    return {
        async execute(id: number): Promise<void> {
            const deleted = await userRepository.delete(id);
            if (!deleted) {
                throw new Error('User not found');
            }
        }
    };
}
