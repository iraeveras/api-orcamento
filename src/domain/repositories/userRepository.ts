import { User, UserResponse } from '@/domain/entities/User';

export interface IUserRepository {
    create(data: Omit<User, 'id' | 'role' | 'companies' | 'createdAt' | 'updatedAt' | 'lastLogin'> & { companyIds?: number[] }): Promise<UserResponse>;
    update(id: number, data: Partial<Omit<User, 'id' | 'role' | 'companies' | 'createdAt' | 'updatedAt' | 'lastLogin'>> & { companyIds?: number[] }): Promise<UserResponse>;
    findById(id: number): Promise<UserResponse | null>;
    findByEmail(email: string): Promise<UserResponse | null>;
    list(): Promise<UserResponse[]>;
    delete(id: number): Promise<boolean>;
}