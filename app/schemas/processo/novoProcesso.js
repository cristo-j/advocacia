module.exports = {
  type: 'object',
  properties: {
    numero_processo: { type: 'string', not: { type: 'null' }, minLength: 10 },
    descricao: { type: 'string', not: { type: 'null' } },
    status: { type: 'string', not: { type: 'null' } },
  },
  required: ['numero_processo', 'descricao', 'status'],
  additionalProperties: false,
};
