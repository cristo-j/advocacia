const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Advocacia - Pack de Aprendizado',
      version: '1.0.0',
      description: 'Documentação da API RESTful para gestão de Advogados e Processos.',
    },
    servers: [
      {
        url: 'http://localhost:3000', // A URL base do seu servidor (verifique em seu .env)
        description: 'Servidor de Desenvolvimento',
      },
    ],
    // Define o esquema de segurança para o Token JWT
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Para acessar as rotas protegidas, insira o token no formato: Bearer [seu_token]'
        }
      },
      // Define os "objetos" que sua API usa
      schemas: {
        advogado: {
          type: 'object',
          properties: {
            id: { type: 'integer', description: 'ID do advogado', example: 1 },
            nome: { type: 'string', description: 'Nome do advogado', example: 'João das Couves' },
            oab: { type: 'string', description: 'Número da OAB', example: '12345 SC'},
            especialidade: { type: 'string', description: 'Área de Especialidade', example: 'Trabalhista' },
          }
        },
        Post_Edit_advogado: {
          type: 'object',
          required: ['nome', 'oab', 'especialidade'],
          properties: {
            nome: { type: 'string', description: 'Nome do advogado', example: 'João das Couves' },
            oab: { type: 'string', description: 'Número da OAB', example: '12345 SC'},
            especialidade: { type: 'string', description: 'Área de Especialidade', example: 'Trabalhista' },
          }
        },
        processo: {
            type: 'object',
            properties: {
                id: { type: 'integer', description: 'ID do processo' },
                id_advogado: { type: 'integer', description: 'ID do advogado responsável pelo processo' },
                numero_processo: { type: 'string', description: 'Número do processo na Justiça', example: '9999999-99.2025.9.99.999' },
                descricao: { type: 'string', description: 'Descrição do processo', example: 'Ação de indenização por danos morais' },
                status: { type: 'string', description: 'Situação atual do processo', example: 'em andamento, arquivado, finalizado' },
            }
        },
        Post_Edit_processo: {
            type: 'object',
            required: ['numero_processo', 'descricao', 'status'],
            properties: {
                numero_processo: { type: 'string', description: 'Número do processo na Justiça', example: '9999999-99.2025.9.99.999' },
                descricao: { type: 'text', description: 'Descrição do processo', example: 'Ação de indenização por danos morais' },
                status: { type: 'string', description: 'Situação atual do processo', example: 'em andamento, arquivado, finalizado' },
            }
        },
        usuario: {
          type: 'object',
          required: ['nome', 'email', 'senha'],
          properties: {
            nome: { type: 'string', description: 'Nome do usuário', example: 'João' },
            email: { type: 'string', description: 'email do usuário', example: 'teste@gmail.com'},
            senha: { type: 'string', description: 'senha', example: 'minhasenha' },
          }
        },
        login: {
          type: 'object',
          required: ['email', 'senha'],
          properties: {
            email: { type: 'string', description: 'email do usuário', example: 'teste@gmail.com'},
            senha: { type: 'string', description: 'senha', example: 'minhasenha' },
          }
        }
      }
    }
  },
  // Caminho para os arquivos que contêm os comentários do Swagger
  apis: [
    './app/routes/*.js', // Aponta para todos os arquivos na sua pasta de rotas
  ],
};

const specs = swaggerJsdoc(options);

module.exports = specs;
