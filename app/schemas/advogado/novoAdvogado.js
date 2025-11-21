module.exports = {
  type: 'object',
  properties: {
    nome: { type: 'string', not: { type: 'null' }, minLength: 4 },
    oab: { type: 'string', not: { type: 'null' } },
    especialidade: { type: 'string', not: { type: 'null' } },
  },
  required: ['nome', 'oab', 'especialidade'],
  additionalProperties: false,
};
