module.exports = {
  type: 'object',
  properties: {
    nome: { type: 'string', not: { type: 'null' }, minLength: 4 },
    oab: { type: 'string', not: { type: 'null' }, minLength: 4 },
    especialidade: { type: 'string', not: { type: 'null' }, minLength: 4 },
  },
  required: ['nome', 'oab', 'especialidade'],
  additionalProperties: false,
};
