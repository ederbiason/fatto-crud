# 📋 Fatto CRUD

Este projeto é um teste para uma vaga de estágio na Fatto Consultoria e Sistemas. Ele consiste em um CRUD de tarefas com funcionalidades de criação, edição, exclusão e organização de tarefas, com drag-and-drop, além de uma interface responsiva e agradável. 

> [🎥 Veja o vídeo de demonstração do sistema funcionando aqui!](https://drive.google.com/file/d/1yt_PNIHRluhnbRr1W7kjZ9VIw15ulrHB/view?usp=sharing) 

## 📂 Estrutura do Projeto

O projeto está dividido em duas partes:
- **Server**: Backend implementado com Express.
- **Client**: Frontend criado com Vite e React.

## 🚀 Configuração e Execução

### Clonando o Repositório

1. Clone o repositório:
   ```bash
   git clone https://github.com/ederbiason/fatto-crud.git

## 🔧 Configuração do Servidor
1. Navegue até a pasta do servidor:
   ```bash
   cd fatto-crud/server

2. Instale as dependências:
   ```bash
   npm install

3. Inicie o servidor na porta 3000:
   ```bash
   npm run start

## 🖥️ Configuração do Cliente
1. Navegue até a pasta do cliente:
   ```bash
   cd fatto-crud/client

2. Instale as dependências:
   ```bash
   npm install

3. Inicie o cliente (porta 5173 deve estar livre para o projeto rodar):
   ```bash
   npm run dev

## ✅ Funcionalidades Implementadas

- **Listagem de Tarefas**: Todas as tarefas armazenadas na tabela "Tarefas" são listadas uma abaixo da outra.
- **Destaque para Tarefas de Alto Custo**: Tarefas com "Custo" maior ou igual a R$1.000,00 são apresentadas com um fundo amarelo.
- **Botões de Ação**: Cada tarefa tem ícones de "Editar" e "Excluir" à direita.
- **Confirmação para Exclusão**: Exibe uma mensagem de confirmação (Sim/Não) antes de excluir qualquer tarefa.
- **Edição em Popup**: Um modal popup permite a edição dos campos "Nome", "Custo" e "Data Limite" de cada tarefa.
- **Ordenação com Drag-and-Drop**: O usuário pode reorganizar as tarefas arrastando-as para cima ou para baixo.

## 🛠 Tecnologias Utilizadas

- **Backend**: Node.js, Express
- **Frontend**: React, Vite
- **Outras**:
  - Axios para requisições HTTP
  - ShadcnUI para o modal de criação e edição de tarefas

## 🎯 Objetivo do Projeto

O projeto foi desenvolvido como parte do processo seletivo para uma vaga de estágio na Fatto Consultoria e Sistemas, visando demonstrar habilidades em desenvolvimento de aplicações web fullstack.
