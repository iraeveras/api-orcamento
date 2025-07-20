// FILE: src/app.ts
import express, {Request, Response, NextFunction} from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

import userRoutes from '@/infra/http/routes/userRoutes';
import companyRoutes from '@/infra/http/routes/companyRoutes';
import departmentRoutes from '@/infra/http/routes/departmentRoutes';
import sectorRoutes from '@/infra/http/routes/sectorRoutes';
import teamsRoutes from '@/infra/http/routes/teamsRoutes';
import costCenterRoutes from '@/infra/http/routes/costCenterRoutes';
import employeeRoutes from '@/infra/http/routes/employeeRoutes';
import acquisitionPeriodRoutes from '@/infra/http/routes/acquisitionPeriodRoutes';
import roleRoutes from "@/infra/http/routes/roleRoutes";
import vacationsRoutes from "@/infra/http/routes/vacationsRoutes";

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
app.use('/teams', teamsRoutes);
app.use('/cost-centers', costCenterRoutes);
app.use('/employees', employeeRoutes);
app.use('/acquisition-periods', acquisitionPeriodRoutes);
app.use("/roles", roleRoutes);
app.use("/vacations", vacationsRoutes);


// Middleware global de erro (após todas as rotas)
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err); // log no terminal
    res.status(500).json({ error: err.message || 'Internal server error' });
});

export default app;