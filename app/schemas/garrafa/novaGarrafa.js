module.exports = {
  type: 'object',
  properties: {
    safra: { type: 'integer', 
      minimum: 1900, 
      maximum: 2100 },
    preco_compra: { type: 'number',
      multipleOf: 0.01,
      minimum: 0,
      maximum: 99999999.99
      },
    data_aquisicao: { type: 'string', format: 'date' },
    consumida: { type: 'boolean' },
    data_consumo: { type: 'string', format: 'date' },
    avaliacao: { type: 'number',
      multipleOf: 0.1,
      minimum: 0,
      maximum: 10
      },

  },
  required: ['safra', 'preco_compra', 'data_aquisicao'],
  additionalProperties: false,
};
