# 🚚 Rota de Encomendas - FastEntregas

Este projeto é uma solução completa Full Stack para gerenciamento e acompanhamento de rotas de entregas, desenvolvido como parte do trabalho do Grupo 06. Ele é dividido em duas partes principais: uma API (Backend) para processamento de dados e rotas, e um Aplicativo Mobile (Frontend) para a interface do usuário (motoristas e administradores).

---
# 🚀 Sobre o Projeto:

O FastEntregas foi desenvolvido para facilitar o controle e o acompanhamento das encomendas, oferecendo uma solução integrada entre backend (API) e frontend mobile. O sistema permite cadastrar, atualizar e listar entregas, além de possibilitar o uso do aplicativo para visualização e manipulação dos dados.

--- 
# 🛠️ Tecnologias Utilizadas
**Backend (API – Node.js + Prisma):**
- Node.js
- Prisma ORM
- Banco Supabase

**Frontend (Aplicativo Mobile – React Native):**
- React Native
- Expo
- React Navigation

---
# ⚙️ Como Rodar o Projeto

**Pré-requisitos:**
Você precisará ter instalado em sua máquina:
- Node.js (Versão recomendada: 18.x ou superior)
- npm ou yarn

1. Clonar o projeto
```
git clone https://github.com/gpo6-arch/RotaEntregas-Grupo6.git
```
**📌 Rodando a API:**

Entre na pasta da API:
```
cd API/APP/FastEntregas
```
1. Instalar dependências:
```
npm install
```
2. Executar migrações do Prisma:
```
npx prisma migrate dev
```
3. Iniciar o servidor:
```
npm start
```
A API estará rodando em: <strong>http://localhost:3333</strong>
---
**📱 Rodando o Aplicativo Mobile**

Entre na pasta do App:
```
cd APP/FastEntregas
```
1. Instalar dependências:
```
npm install
```
2. Iniciar o aplicativo:
```
expo start
``` 
Abra o app no celular via Expo Go ou use um emulador.

---
# Observação: 🚧 Desafio na Configuração Docker

A configuração do Docker para a API encontrou problemas de instabilidade devido à complexidade da estrutura de diretórios e ao alto volume de dados no contexto de build.

**❌ Dificuldades Encontradas:**
- Sobrecarga de Contexto: Tempo excessivo para carregar o contexto e cancelamentos automáticos do build por exceder os limites do Docker Desktop.
- Problemas no Windows: Caminhos longos e pastas aninhadas aumentaram significativamente o tempo de transferência do contexto.
- Conflito de Localização: Falhas na execução causadas por um desalinhamento entre o Dockerfile e o arquivo principal da API (server.js).

Por fim, estou enviando o repositório.

---
👥 Integrantes
O projeto foi desenvolvido pelos seguintes integrantes do Grupo 06:

- Alana Aparecida Rizzo 
- Isabella Monsalles
- Joaquim Diglio
- Maria Eduarda Torres
