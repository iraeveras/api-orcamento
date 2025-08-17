// FILE: src/scripts/seedReset.ts
import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

/**
 * Seed idempotente focado APENAS em:
 * - Role "Administrador" (level 'admin') com permissões dos módulos 'users' e 'roles'
 * - Usuário admin (name/email/password/roleId)
 *
 * Não acessa `prisma.permission` diretamente; usa escrita aninhada em `prisma.role`.
 */

const DEFAULT_ADMIN_NAME = process.env.ADMIN_NAME ?? 'Administrador'
const DEFAULT_ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? 'admin@gmail.com'
const DEFAULT_ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? 'admin123'

async function ensureAdminRole() {
    // 1) cria se não existir
    let adminRole = await prisma.role.findFirst({
        where: { name: 'Administrador' },
        include: { permissions: true }, // <- relação conforme seu seedAdmin.ts
    })

    if (!adminRole) {
        adminRole = await prisma.role.create({
            data: {
                name: 'Administrador',
                level: 'admin',
                description: 'Acesso total ao sistema',
                permissions: {
                    create: [
                        {
                            module: 'users',
                            actions: ['read', 'write', 'delete', 'export'],
                            scope: 'all',
                        },
                        {
                            module: 'roles',
                            actions: ['read', 'write', 'delete', 'export'],
                            scope: 'all',
                        },
                    ],
                },
            },
            include: { permissions: true },
        })
        return adminRole
    }

    // 2) se já existe, atualiza meta e SINCRONIZA permissões só para 'users' e 'roles'
    const desired = [
        { module: 'users', actions: ['read', 'write', 'delete', 'export'], scope: 'all' },
        { module: 'roles', actions: ['read', 'write', 'delete', 'export'], scope: 'all' },
    ]

    adminRole = await prisma.role.update({
        where: { id: adminRole.id },
        data: {
            level: 'admin',
            description: 'Acesso total ao sistema',
            // zera as permissões atuais do role e recria apenas as desejadas
            permissions: {
                deleteMany: {}, // remove TODAS as permissões desse role
                create: desired.map((p) => ({
                    module: p.module,
                    actions: p.actions,
                    scope: p.scope,
                })),
            },
        },
        include: { permissions: true },
    })

    return adminRole
}

async function ensureAdminUser(adminRoleId: number) {
    const existing = await prisma.user.findUnique({
        where: { email: DEFAULT_ADMIN_EMAIL },
    })

    if (!existing) {
        const passwordHash = await bcrypt.hash(DEFAULT_ADMIN_PASSWORD, 10)
        await prisma.user.create({
            data: {
                name: DEFAULT_ADMIN_NAME,
                email: DEFAULT_ADMIN_EMAIL,
                password: passwordHash, // seu schema usa "password" (compatível com seu seedAdmin.ts)
                roleId: adminRoleId,
            },
        })
        return { created: true }
    }

  // mantém a senha atual; atualiza metadados que façam sentido
    await prisma.user.update({
        where: { id: existing.id },
        data: {
            name: DEFAULT_ADMIN_NAME,
            roleId: adminRoleId,
            // se quiser forçar troca de senha a cada reset, descomente:
            // password: await bcrypt.hash(DEFAULT_ADMIN_PASSWORD, 10),
        },
    })

    return { created: false }
}

async function main() {
    console.log('🔄 seedReset (ADMIN only) iniciado...')

    const adminRole = await ensureAdminRole()
    const userResult = await ensureAdminUser(adminRole.id)

    console.log('✅ seedReset (ADMIN only) finalizado.')
    console.table({
        role: adminRole.name,
        roleLevel: (adminRole as any).level ?? 'admin',
        adminEmail: DEFAULT_ADMIN_EMAIL,
        adminUserCreated: userResult.created,
    })
}

main()
    .catch((e) => {
        console.error('❌ Erro no seedReset:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })