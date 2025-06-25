import { User } from '@/domain/entities/User';

export interface IUserRepository {
    create(data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User>;
    findById(id: number): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    list(): Promise<User[]>;
    update(id: number, data: Partial<User>): Promise<User | null>;
    delete(id: number): Promise<boolean>;
}