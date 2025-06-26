import { IUserRepository } from '@/domain/repositories/userRepository';
import { IAuditlogRepository } from '@/domain/repositories/auditlogRepository';

interface DeleteContext {
    userId: number;
    ipAddress?: string;
}

export function deleteUserUseCase(
    userRepository: IUserRepository, 
    auditlogRepository: IAuditlogRepository
) {
    return {
        async execute(id: number, context: DeleteContext): Promise<void> {
            const oldUser = await userRepository.findById(id);
            const deleted = await userRepository.delete(id);
            if (!deleted) throw new Error('User not found');

            await auditlogRepository.log({
                userId: context.userId,
                action: 'delete',
                entity: 'User',
                entityId: String(id),
                oldData: oldUser,
                ipAddress: context.ipAddress,
            });
        }
    };
}
