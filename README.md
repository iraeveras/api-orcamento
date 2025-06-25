# API Orçamento Empresarial

API robusta para gestão de orçamento empresarial, seguindo Clean Code, Clean Architecture e tecnologias modernas como Node.js, Express, TypeScript, Prisma ORM e PostgreSQL.

## Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Tecnologias e Padrões](#tecnologias-e-padrões)
- [Arquitetura](#arquitetura)
- [Como Rodar Localmente](#como-rodar-localmente)
- [Configurações de Ambiente](#configurações-de-ambiente)
- [Scripts Disponíveis](#scripts-disponíveis)
- [Estrutura de Pastas](#estrutura-de-pastas)
- [Padrão de Resposta da API](#padrão-de-resposta-da-api)
- [Roadmap](#roadmap)
- [Contribuição](#contribuição)
- [Licença](#licença)

---

## Sobre o Projeto

Essa API é responsável por prover todas as operações de backend do sistema de Orçamento Empresarial, como autenticação, cadastro de usuários, controle de empresas, equipes, permissões, além de registro, atualização e exclusão de orçamentos.

O projeto segue **Clean Architecture**, garantindo organização, fácil manutenção, testabilidade e escalabilidade.

---

## Tecnologias e Padrões

- **Node.js** & **Express.js**
- **TypeScript**
- **Prisma ORM**
- **PostgreSQL**
- **Clean Code**
- **Clean Architecture**
- **Padronização de respostas** (`{ data, error }`)
- **Middlewares centralizados para erros e validação**
- **Variáveis de ambiente (.env)**

---

## Arquitetura

O projeto é organizado em camadas:
- **domain/**: entidades, interfaces de repositórios e use cases (regras de negócio).
- **infra/**: implementação dos repositórios, controllers, rotas, middlewares, conexão com banco.
- **shared/**: utilitários, tratamento de erros, helpers.
- **config/**: arquivos de configuração.
- **prisma/**: schema do banco de dados.

---

## Como Rodar Localmente

1. **Clone o repositório:**
   ```sh
   git clone https://github.com/seu-usuario/api-orcamento.git
   cd api-orcamento

1. **Instale as dependências:**

```sh
npm install
```

3. **Configure o banco de dados PostgreSQL:**
- Crie um banco local ou use cloud (ex: Railway, Neon, Supabase).
- Defina a variável DATABASE_URL no arquivo .env na raiz do projeto.

4. **Rode as migrations do Prisma:**
```sh
npx prisma migrate dev --name init
```
5. **Inicie o servidor em desenvolvimento:**
```sh
npm run dev
```
## Configurações de Ambiente
Exemplo do arquivo .env:
```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/orcamento_db"
PORT=3001
JWT_SECRET=uma-chave-secreta
BACKEND_URL=http://localhost:3001
```
### Scripts Disponíveis
- npm run dev — inicia o servidor em modo desenvolvimento com recarga automática.
- npm run build — compila o projeto para o diretório dist.
- npm run start — executa a versão compilada.

### Estrutura de Pastas
```pgsql
src/
├── config/
├── domain/
│   ├── entities/
│   ├── repositories/
│   └── usecases/
├── infra/
│   ├── database/
│   └── http/
│       ├── controllers/
│       └── routes/
├── shared/
│   ├── errors/
│   └── utils/
├── app.ts
└── server.ts
prisma/
│   └── schema.prisma
.env
```
