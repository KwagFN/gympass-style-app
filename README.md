# Gympass Style App

Este é um projeto de uma API de gerenciamento de academias, permitindo que usuários realizem check-ins, busquem academias próximas, e administradores validem check-ins. A aplicação foi desenvolvida incluindo uso de autenticação JWT, criptografia de senhas e validação com Zod.

## Funcionalidades

- Cadastro de usuários
- Autenticação de usuários
- Check-ins de usuários em academias
- Busca de academias próximas (até 10 km)
- Validação de check-ins por administradores
- Criação de academias por administradores
- Visualização do perfil do usuário logado
- Histórico de check-ins do usuário

## Estrutura de Pastas

Abaixo estão as pastas mais importantes do projeto e suas responsabilidades:

- **`src/http/controllers`**: Contém os controllers responsáveis pelas rotas HTTP. A validação dos dados de entrada é feita utilizando o Zod.
  
- **`src/env`**: Configuração e validação das variáveis de ambiente utilizando o Zod para garantir segurança e consistência nas configurações.

- **`src/use-cases`**: Implementa os casos de uso principais da aplicação, como cadastro de usuários, check-ins e busca por academias.

- **`src/repositories`**: Contém as interfaces e implementações dos repositórios que fazem a comunicação com o banco de dados (PostgreSQL).

## Tecnologias Utilizadas

- **Node.js** com TypeScript
- **Fastify** para gerenciamento de rotas HTTP
- **Zod** para validação de dados
- **PostgreSQL** para persistência de dados
- **JWT (JSON Web Token)** para autenticação e segurança
- **Docker** para facilitar o setup de desenvolvimento e produção

## Executando o Projeto

Para rodar a aplicação localmente, siga os passos abaixo:

1. Clone o repositório:

```bash
git clone https://github.com/KwagFN/gympass-style-app.git
```

2. Configure as variáveis de ambiente no arquivo .env usando o modelo fornecido em .env.example.


3. Suba os serviços Docker:

```bash
docker compose up
```

3. Execute as migrações do banco de dados:

```bash
npx prisma migrate dev
```

4. Inicie a aplicação:

```bash
npm run start:dev
```


