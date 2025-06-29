// FILE: src/app.ts
import express, {Request, Response, NextFunction} from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

import userRoutes from '@/infra/http/routes/userRoutes';
import companyRoutes from '@/infra/http/routes/companyRoutes';
import departmentRoutes from '@/infra/http/routes/departmentRoutes';
import sectorRoutes from '@/infra/http/routes/sectorRoutes';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(helmet());

app.get('/health', (req, res) => {
    res.json({status: 'ok'});
});

app.use('/users', userRoutes);
app.use('/companies', companyRoutes);
app.use('/departments', departmentRoutes);
app.use('/sectors', sectorRoutes);


// Middleware global de erro (após todas as rotas)
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err); // log no terminal
    res.status(500).json({ error: err.message || 'Internal server error' });
});

export default app;