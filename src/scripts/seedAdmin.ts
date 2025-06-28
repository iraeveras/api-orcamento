import { PrismaClient } from '../../generated/prisma';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    // Crie ou busque o role ADMIN
    let adminRole = await prisma.role.findFirst({
        where: { name: 'Administrador' },
    });

    if (!adminRole) {
        adminRole = await prisma.role.create({
            data: {
                name: 'Administrador',
                level: 'admin',
                description: 'Acesso total ao sistema',
                permissions: {
                    create: [
                        { module: 'users', actions: ['read', 'write', 'delete'], scope: 'all' },
                        { module: 'roles', actions: ['read', 'write', 'delete'], scope: 'all' },
                        // adicione outros módulos conforme necessário
                    ],
                },
            },
            include: { permissions: true },
        });
    }

    // Verifica se já existe um admin com este email
    const existing = await prisma.user.findUnique({ where: { email: 'admin@empresa.com' } });
    if (existing) {
        console.log('Usuário admin já existe:', existing.email);
        return;
    }

    const passwordHash = await bcrypt.hash('admin123', 10);

    const adminUser = await prisma.user.create({
        data: {
            name: 'Administrador',
            email: 'admin@empresa.com',
            password: passwordHash,
            roleId: adminRole.id,
        },
        include: { role: true },
    });

    console.log('Usuário admin criado:', adminUser.email);
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });