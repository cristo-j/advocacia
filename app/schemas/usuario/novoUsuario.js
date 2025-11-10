module.exports = {
  type: 'object',
  properties: {
    nome: { type: 'string', minLength: 4, not: { type: 'null' } },
    email: { type: 'string', not: { type: 'null' } },
    senha: { type: 'string', not: { type: 'null' } },
  },
  required: ['nome', 'email', 'senha'],
  additionalProperties: false,
};
