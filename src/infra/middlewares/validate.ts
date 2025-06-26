import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

export function validate(schema: ZodSchema<any>) {
    return (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse(req.body);
        if (!result.success) {
            res.status(422).json({ error: result.error.flatten() });
            return;
        }
        req.body = result.data; // body tipado e limpo!
        next();
    };
}
