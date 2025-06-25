import { IUserRepository } from '@/domain/repositories/userRepository';
import { User } from '@/domain/entities/User';

export function makeUpdateUserUseCase(userRepository: IUserRepository) {
    return {
        async execute(id: number, data: Partial<User>): Promise<User> {
        // Aqui pode colocar regras de negócio/validações
            const updated = await userRepository.update(id, data);
            if (!updated) {
                throw new Error('User not found');
            }
            return updated;
        }
    };
}
