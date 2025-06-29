import { Request, Response } from 'express';
import { createCompanyUseCase } from '@/domain/usecases/company/createCompanyUseCase';
import { updateCompanyUseCase } from '@/domain/usecases/company/updateCompanyUseCase';
import { listCompanyUseCase } from '@/domain/usecases/company/listCompanyUseCase';
import { deleteCompanyUseCase } from '@/domain/usecases/company/deleteCompanyUseCase';
import { companyRepositoryPrisma } from '@/infra/database/prisma/companyRepositoryPrisma';
import { auditlogRepositoryPrisma } from '@/infra/database/prisma/auditlogRepositoryPrisma';
import { apiResponse } from '@/shared/utils/apiResponse';

const companyRepository = companyRepositoryPrisma();
const auditlogRepository = auditlogRepositoryPrisma();

export async function createCompany(req: Request, res: Response): Promise<void> {
    try {
        const context = {
            userId: req.user?.id || 0,
            ipAddress: req.ip,
        };
        const useCase = createCompanyUseCase(companyRepository, auditlogRepository);
        const company = await useCase.execute(req.body, context);
        res.status(201).json(apiResponse(company));
    } catch (error) {
        res.status(400).json(apiResponse(null, error instanceof Error ? error.message : 'Unexpected error'));
    }
}

export async function updateCompany(req: Request, res: Response): Promise<void> {
    try {
        const context = {
            userId: req.user?.id || 0,
            ipAddress: req.ip,
        };
        const useCase = updateCompanyUseCase(companyRepository, auditlogRepository);
        const { id } = req.params;
        const company = await useCase.execute(Number(id), req.body, context);
        res.status(200).json(apiResponse(company));
    } catch (error) {
        res.status(400).json(apiResponse(null, error instanceof Error ? error.message : 'Unexpected error'));
    }
}

export async function listCompanies(req: Request, res: Response): Promise<void> {
    try {
        const useCase = listCompanyUseCase(companyRepository);
        const companies = await useCase.execute();
        res.status(200).json(apiResponse(companies));
    } catch (error) {
        res.status(400).json(apiResponse(null, error instanceof Error ? error.message : 'Unexpected error'));
    }
}

export async function deleteCompany(req: Request, res: Response): Promise<void> {
    try {
        const context = {
            userId: req.user?.id || 0,
            ipAddress: req.ip,
        };
        const useCase = deleteCompanyUseCase(companyRepository, auditlogRepository);
        const { id } = req.params;
        const result = await useCase.execute(Number(id), context);
        if (result) {
            res.status(204).json(apiResponse({ message: 'Empresa excluída com sucesso.' }));
        } else {
            res.status(404).json(apiResponse(null, 'Empresa não encontrada.'));
        }
    } catch (error) {
        res.status(400).json(apiResponse(null, error instanceof Error ? error.message : 'Unexpected error'));
    }
}