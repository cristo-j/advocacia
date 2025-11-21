module.exports = {
  type: 'object',
  properties: {
    nome: { type: 'string', minLength: 4, not: { type: 'null' } },
    email: { type: 'string', not: { type: 'null' }, pattern: '^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$' },
    senha: { type: 'string', minLength: 8, not: { type: 'null' } },
  },
  required: ['nome', 'email', 'senha'],
  additionalProperties: false,
};
