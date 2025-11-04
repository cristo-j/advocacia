module.exports = {
  type: 'object',
  properties: {
    numero_processo: { type: 'string' },
    descricao: { type: 'string' },
    status: { type: 'string' },
  },
  required: ['numero_processo', 'descricao', 'status'],
  additionalProperties: false,
};
