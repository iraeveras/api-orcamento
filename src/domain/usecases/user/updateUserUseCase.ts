// FILE: src/domain/usecase/user/updateUserUserCase.ts
import { IUserRepository } from '@/domain/repositories/userRepository';
import { IAuditlogRepository } from '@/domain/repositories/auditlogRepository';
import { User, UserResponse } from '@/domain/entities/User';

interface UpdateContext {
    userId: number;
    ipAddress?: string;
}

export function updateUserUseCase(userRepository: IUserRepository, auditlogRepository: IAuditlogRepository) {
    return {
        async execute(id: number, data: Partial<User>, context: UpdateContext): Promise<UserResponse> {
        // Aqui pode colocar regras de negócio/validações
            const oldUser = await userRepository.findById(id);
            const updated = await userRepository.update(id, data);
            if (!updated) throw new Error('User not found');

            await auditlogRepository.log({
                userId: context.userId,
                action: 'update',
                entity: 'User',
                entityId: String(id),
                oldData: oldUser,
                newData: { ...updated },
                ipAddress: context.ipAddress
            });
            
            return updated;
        }
    };
}
