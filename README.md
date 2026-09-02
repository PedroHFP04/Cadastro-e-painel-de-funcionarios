# Prova Prática - Desenvolvedor Full-Stack / Técnico

Aplicação full-stack desenvolvida para teste técnico, contendo backend em FastAPI, persistência em PostgreSQL, frontend em Angular (formulário de cadastro) e frontend em React (painel gerencial analítico com Tailwind e Recharts), totalmente orquestrada via Docker.

## Tecnologias Utilizadas
* **Backend**: Python, FastAPI, SQLAlchemy, PostgreSQL (`psycopg`)
* **Frontend 1**: Angular 17 (Formulário de Inserção com validações)
* **Frontend 2**: React + Vite + Tailwind CSS + Recharts (Dashboard e Indicadores)
* **DevOps**: Docker & Docker Compose

## Como Executar o Projeto

Certifique-se de ter o Docker e o Docker Compose instalados.

1. Clone o repositório e acesse a raiz do projeto.
2. Suba todos os quatro serviços simultaneamente utilizando o Docker Compose:
   ```bash
   docker compose up -d --build

## Portas e Acessos
Formulário Angular: http://localhost:4200


Painel Gerencial React: http://localhost:5173


Documentação da API (Swagger): http://localhost:8080/docs


Banco de Dados PostgreSQL: Acessível externamente na porta 5433 (Credenciais: postgres / password / api_db)

## Limitações
Funcionalidades avançadas como paginação, autenticação de usuários e testes automatizados foram omitidas por opção de escopo simplificado e limite de tempo.