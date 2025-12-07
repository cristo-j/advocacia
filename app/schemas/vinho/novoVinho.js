module.exports = {
  type: 'object',
  properties: {
    nome: { type: 'string', minLength: 1 },
    produtor: { type: 'string', minLength: 4  },
    pais_origem: { type: 'string'  },
    tipo: { type: 'string' },
    uva_casta: { type: 'string' },
  },
  required: ['nome', 'produtor'],
  additionalProperties: false,
};
