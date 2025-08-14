import { PrismaClient, Prisma } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import readline from 'readline';

const prisma = new PrismaClient();

// Ajuste se quiser falhar quando faltar FK:
const FK_DEFAULTS = { companyId: 1, departmentId: 1, sectorId: 1 };
const FILE_PATH = path.join(process.cwd(), 'prisma', 'data', 'employees.txt'); // ; + HEADER
const BATCH_SIZE = 250;

function parseDecimalBR(v?: string | null): number | null {
    if (!v) return null;
    const t = v.trim();
    if (!t) return null;
    if (!/^[0-9.,-]+$/.test(t)) return null;
    return Number(t.replace(/\./g, '').replace(',', '.'));
}

function parseBooleanLoose(v?: string | null): boolean {
    if (!v) return false;
    const t = v.trim().toLowerCase();
    return ['t','true','1','sim','s','yes','y'].includes(t);
}

function normalizeStatus(v?: string | null): string {
    if (!v || !v.trim()) return 'Ativo';
    const t = v.trim().toLowerCase();
    if (t === 'active' || t === 'ativo') return 'Ativo';
    if (t === 'inactive' || t === 'inativo') return 'Inativo';
    return v.trim();
}

function normalizeWorkSchedule(v?: string | null): string | null {
    if (!v) return null;
    const t = v.trim();
    if (!t) return null;
    if (/^adm\.?$/i.test(t)) return 'ADM';
    return t;
}

// "DD/MM/YYYY HH:mm" ou "DD/MM/YYYY"
function parseBRDateTime(v?: string | null): Date | null {
    if (!v) return null;
    const t = v.trim();
    if (!t) return null;
    const [datePart, timePart] = t.split(' ');
    const [dd, mm, yyyy] = (datePart || '').split('/').map(Number);
    if (!yyyy || !mm || !dd) return null;
    let hh = 0, mi = 0;
    if (timePart) {
        const [hhs, mis] = timePart.split(':');
        hh = Number(hhs ?? 0);
        mi = Number(mis ?? 0);
    }
    return new Date(Date.UTC(yyyy, mm - 1, dd, hh, mi, 0));
}

function parseHeaders(line: string): string[] {
    return line.split(';').map(h => h.trim());
}
function rowToRecord(headers: string[], line: string): Record<string, string> {
    const cols = line.split(';').map(c => c.trim());
    const rec: Record<string, string> = {};
    headers.forEach((h, i) => (rec[h] = cols[i] ?? ''));
    return rec;
}

function toUpsertArgs(rec: Record<string, string>): Prisma.EmployeeUpsertArgs {
    const matricula = rec['matricula']?.trim();
    if (!matricula) throw new Error('Registro sem "matricula".');

    const name = rec['name']?.trim() ?? '';
    const position = rec['position']?.trim() ?? '';
    const admission = parseBRDateTime(rec['admission']) ?? new Date();
    const salary = parseDecimalBR(rec['salary']) ?? 0;
    const dangerPay = parseBooleanLoose(rec['dangerPay']);
    const monthlyHours = parseDecimalBR(rec['monthlyHours']) ?? 0;
    const workSchedule = normalizeWorkSchedule(rec['workSchedule']) ?? 'ADM';
    const status = normalizeStatus(rec['status']);

    const companyId = rec['companyId']?.trim() ? Number(rec['companyId']) : FK_DEFAULTS.companyId;
    const departmentId = rec['departmentId']?.trim() ? Number(rec['departmentId']) : FK_DEFAULTS.departmentId;
    const sectorId = rec['sectorId']?.trim() ? Number(rec['sectorId']) : FK_DEFAULTS.sectorId;

    const createdAt = rec['createdAt']?.trim() ? new Date(rec['createdAt']) : new Date();
    const updatedAt = rec['updatedAt']?.trim() ? new Date(rec['updatedAt']) : new Date();

    const createData: Prisma.EmployeeUncheckedCreateInput = {
        matricula, name, admission, position, salary, dangerPay,
        monthlyHours, workSchedule, status, companyId, departmentId, sectorId,
        createdAt, updatedAt,
    };

    return {
        where: { matricula },
        update: {
            name, admission, position, salary, dangerPay,
            monthlyHours, workSchedule, status, companyId, departmentId, sectorId,
            // updatedAt é @updatedAt, não precisa enviar; colocamos só por clareza
            updatedAt: new Date(),
        },
        create: createData,
    };
}

async function main() {
    if (!fs.existsSync(FILE_PATH)) {
        throw new Error(`Arquivo não encontrado: ${FILE_PATH}`);
    }

    const rl = readline.createInterface({
        input: fs.createReadStream(FILE_PATH, { encoding: 'utf-8' }),
        crlfDelay: Infinity,
    });

    let headers: string[] | null = null;
    const buffer: Prisma.EmployeeUpsertArgs[] = [];
    let total = 0;

    async function flush() {
        if (buffer.length === 0) return;
        const chunk = buffer.splice(0, buffer.length);
        // Quebra em sublotes para Promise.allSettled
        for (let i = 0; i < chunk.length; i += BATCH_SIZE) {
            const part = chunk.slice(i, i + BATCH_SIZE);
            const ops = part.map(args => prisma.employee.upsert(args));
            const res = await Promise.allSettled(ops);
            const fails = res.filter(r => r.status === 'rejected') as PromiseRejectedResult[];
            if (fails.length) {
                console.error('\nFalhas no batch:');
                fails.forEach(f => console.error(f.reason));
                throw new Error('Erro ao executar upsert em batch (veja logs).');
            }
            total += part.length;
            process.stdout.write(`\rImportados/atualizados: ${total}`);
        }
    }

    let lineNo = 0;
    for await (const raw of rl) {
        const line = raw.replace(/\r$/, '');
        if (!line.trim()) continue;
        lineNo++;

        if (!headers) { headers = parseHeaders(line); continue; }

        const rec = rowToRecord(headers, line);
        try {
            buffer.push(toUpsertArgs(rec));
        } catch (e) {
            console.error(`\nLinha ${lineNo} inválida:`, e);
            throw e;
        }

        if (buffer.length >= BATCH_SIZE * 4) await flush();
    }
    await flush();

    console.log(`\nSeed de Employees concluído! Total processado: ${total}`);
}

main()
    .catch(async (e) => { console.error('\nErro no seed:', e); process.exitCode = 1; })
    .finally(async () => { await prisma.$disconnect(); });
