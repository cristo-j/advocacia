module.exports = {
  type: 'object',
  properties: {
    nome: { type: 'string', minLength: 4 },
    email: { type: 'string', pattern: '^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$' },
    senha: { type: 'string', minLength: 8 },
  },
  required: ['nome', 'email', 'senha'],
  additionalProperties: false,
};
