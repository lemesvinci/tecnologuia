# Tecnologuia - Caminhos em TI 🚀

Bem-vindo ao **Tecnologuia**, um projeto voltado para orientar estudantes e profissionais iniciantes na área de Tecnologia da Informação (TI). Este site permite que usuários se cadastrem, façam login, publiquem e gerenciem comentários sobre diferentes áreas de TI (como Desenvolvimento de Software, Cibersegurança e Inteligência Artificial), além de oferecer funcionalidades como recuperação de senha e um perfil personalizado.

O projeto foi desenvolvido com um frontend em **React** e um backend em **Node.js** com **Express**, utilizando **PostgreSQL** como banco de dados. Ele também incorpora boas práticas de acessibilidade (WCAG 2.1) para garantir uma experiência inclusiva.

---

## 📋 **Funcionalidades**

- **Autenticação de Usuários**:
  - Cadastro e login de usuários.
  - Funcionalidade "Esqueci minha senha" com envio de email para redefinição.
  - Logout seguro.

- **Comentários**:
  - Usuários autenticados podem criar, visualizar e excluir comentários.
  - Comentários são associados a áreas específicas de TI (ex.: Desenvolvimento de Software, Cibersegurança).
  - Cada comentário exibe a data e horário de criação.

- **Perfil do Usuário**:
  - Exibição e atualização de informações do perfil (nome, email, telefone, localização, ocupação, bio).

- **Acessibilidade**:
  - Suporte a navegação por teclado com foco visível.
  - Uso de HTML semântico e atributos ARIA para leitores de tela.
  - Contraste de cores ajustado para atender ao WCAG 2.1 (nível AA).

---

## 🛠️ **Tecnologias Utilizadas**

### **Frontend**
- **React** (18.x) - Biblioteca para construção da interface.
- **TypeScript** - Para tipagem estática e segurança no código.
- **Tailwind CSS** - Framework de estilização.
- **React Router** - Gerenciamento de rotas.
- **Axios** - Requisições HTTP.
- **Lucide React** - Ícones acessíveis.

### **Backend**
- **Node.js** (18.x) - Ambiente de execução.
- **Express** - Framework para construção da API.
- **PostgreSQL** - Banco de dados relacional.
- **pg-promise** - Biblioteca para interação com PostgreSQL.
- **jsonwebtoken (JWT)** - Autenticação baseada em tokens.
- **bcrypt** - Criptografia de senhas.
- **Nodemailer** - Envio de emails para recuperação de senha.

---

## 📂 **Estrutura do Projeto**
tecnologuia/
├── backend/                    # Código do backend
│   ├── src/
│   │   ├── config/             # Configurações (banco, email, etc.)
│   │   ├── controllers/        # Lógica dos endpoints
│   │   ├── middleware/         # Middlewares (ex.: autenticação)
│   │   ├── routes/             # Definição das rotas da API
│   │   └── index.ts            # Arquivo principal do backend
│   ├── .env                    # Variáveis de ambiente
│   ├── package.json
│   └── tsconfig.json
├── frontend/                   # Código do frontend
│   ├── src/
│   │   ├── components/         # Componentes reutilizáveis
│   │   ├── contexts/           # Contextos (ex.: AuthContext)
│   │   ├── pages/              # Páginas do site
│   │   ├── config/             # Configurações (ex.: API URL)
│   │   ├── App.tsx             # Componente principal
│   │   ├── index.tsx           # Entry point
│   │   └── index.css           # Estilos globais
│   ├── public/                 # Arquivos estáticos
│   ├── .env                    # Variáveis de ambiente
│   ├── package.json
│   └── tsconfig.json
└── README.md                   # Documentação do projeto

---

## 🚀 **Como Rodar o Projeto**

### **Pré-requisitos**
- **Node.js** (versão 18 ou superior)
- **PostgreSQL** (versão 12 ou superior)
- **NPM** (ou Yarn)
- Um serviço de email para envio de emails (ex.: Gmail com senha de app)

### **1. Clonar o Repositório**
```bash
git clone https://github.com/seu-usuario/tecnologuia.git
cd tecnologuia

2. Configurar o Banco de Dados
Crie um banco de dados no PostgreSQL:
bash

psql -U postgres
CREATE DATABASE tecnologuia;

Configure as variáveis de ambiente no arquivo backend/.env:

PG_HOST=localhost
PG_PORT=5432
PG_DATABASE=tecnologuia
PG_USER=postgres
PG_PASSWORD=sua-senha
JWT_SECRET=sua-chave-secreta
EMAIL_USER=seu-email@gmail.com
EMAIL_PASS=sua-senha-de-app

3. Instalar Dependências e Rodar o Backend
bash

cd backend
npm install
npm run dev

O backend estará rodando em http://localhost:3000.

4. Instalar Dependências e Rodar o Frontend
bash

cd ../frontend
npm install
npm run dev

O frontend estará rodando em http://localhost:5173.

5. Acessar o Site
Abra o navegador e acesse http://localhost:5173.

Registre-se, faça login e comece a explorar as áreas de TI e os comentários!

 Endpoints da API
Autenticação
POST /api/auth/register - Cadastra um novo usuário.

POST /api/auth/login - Faz login e retorna um token JWT.

POST /api/auth/forgot-password - Envia um email de redefinição de senha.

POST /api/auth/reset-password - Redefine a senha usando o token.

GET /api/auth/profile - Retorna os dados do usuário autenticado.

Comentários
GET /api/comments/areas - Lista todas as áreas de TI.

GET /api/comments?areaId={id} - Lista comentários de uma área específica.

POST /api/comments - Cria um novo comentário (requer autenticação).

DELETE /api/comments/{id} - Exclui um comentário (requer autenticação).

 Testes de Acessibilidade
O projeto foi desenvolvido com foco em acessibilidade, seguindo as diretrizes do WCAG 2.1 (nível AA):
Navegação por Teclado: Todos os elementos interativos são acessíveis via teclado com foco visível.

Leitores de Tela: Uso de HTML semântico, atributos ARIA e rótulos adequados.

Contraste: Cores ajustadas para atender ao contraste mínimo (4.5:1).

Ferramentas Recomendadas para Testes:
Lighthouse (no Chrome DevTools)

NVDA (Windows) ou VoiceOver (Mac) para leitores de tela

WebAIM Contrast Checker para verificar contraste de cores

 Como Contribuir
Faça um fork do repositório.

Crie uma branch para sua feature:
bash

git checkout -b minha-feature

Faça suas alterações e commit:
bash

git commit -m "Adiciona minha feature"

Envie para o repositório remoto:
bash

git push origin minha-feature

Crie um Pull Request descrevendo suas alterações.

 Licença

Este projeto está licenciado sob a MIT License (LICENSE).

 Contato

Se tiver dúvidas ou sugestões, entre em contato:

Email: glemesandrade7@gmail.com

GitHub: lemes
