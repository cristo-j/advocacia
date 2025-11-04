module.exports = {
  type: 'object',
  properties: {
    nome: { type: 'string' },
    oab: { type: 'string' },
    especialidade: { type: 'string' },
  },
  required: ['nome', 'oab', 'especialidade'],
  additionalProperties: false,
};
