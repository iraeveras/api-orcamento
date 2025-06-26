import { Request, Response, NextFunction } from 'express';

// Example: authorize("budget", ["read", "write"])
export function authorize(module: string, actions: string[] = []) {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = req.user;
        if (!user || !user.role || !user.role.permissions) {
            res.status(403).json({ error: 'Acesso negado' });
            return;
        }
        const permissions = user.role.permissions;
        const hasPermission = permissions.some(
            (perm: any) =>
                perm.module === module &&
                actions.every(action => perm.actions.includes(action))
            // Aqui você pode adicionar checagem de scope (ex: empresaId, setorId)
        );
        if (!hasPermission) {
            res.status(403).json({ error: 'Permissão insuficiente' });
            return;
        }
        next();
    };
}
