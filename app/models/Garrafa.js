const Sequelize = require('sequelize');
const db = require('./conexao.js');
const { type } = require('../schemas/vinho/novoVinho.js');

class Garrafa {
  #safra;
  #preco_compra;
  #data_aquisicao;
  #consumida;
  #data_consumo;
  #avaliacao;

  construct() {}

  get safra() {
    return this.#safra;
  }
  set safra(safra) {
    this.#safra = safra;
  }

  get preco_compra() {
    return this.#preco_compra;
  }
  set preco_compra(preco_compra) {
    this.#preco_compra = preco_compra;
  }

  get data_aquisicao() {
    return this.#data_aquisicao;
  }
  set data_aquisicao(data_aquisicao) {
    this.#data_aquisicao = data_aquisicao;
  }
  get consumida() {
    return this.#consumida;
  }
  set consumida(consumida) {
    this.#consumida = consumida;
  }

  get data_consumo() {
    return this.#data_consumo;
  }
  set data_consumo(data_consumo) {
    this.#data_consumo = data_consumo;
  }
  get avaliacao() {
    return this.#avaliacao;
  }
  set avaliacao(avaliacao) {
    this.#avaliacao = avaliacao;
  }


  static findAllByVinhoId(id_vinho) {
    return GarrafaModel.findAll({ where: { id_vinho } });
  }

  static create(novaGarrafa) {
    return GarrafaModel.create(novaGarrafa);
  }


static update(dados, id_vinho, id_garrafa) {
    return GarrafaModel.update(dados, {
        where: { id: id_garrafa, id_vinho: id_vinho }
        });
    }

static findOne(id_vinho, id_garrafa) {
    return GarrafaModel.findOne({ where: { id: id_garrafa, id_vinho: id_vinho } });
}


  static async delete( id_vinho, id_garrafa) {
    try {
      const data = await await GarrafaModel.findOne({
      where: {
        id_vinho: id_vinho,
        id: id_garrafa
      }
    });

      if (data) {
        data.destroy();
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw error;
    }
  }


  
}

const GarrafaModel = db.define('garrafa', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  safra: {
    type: Sequelize.INTEGER(25),
    allowNull: false,
    validate: {
      min: 1900,               // limite inferior
      max: 2100                // limite superior
    }
  }
,
  preco_compra: {
    type: Sequelize.DECIMAL(10,2),
    allowNull: false,
  },
  data_aquisicao: {
    type: Sequelize.DATEONLY,
    allowNull: false,
  },
  consumida: {
    type: Sequelize.BOOLEAN,
    allowNull: true,
  },
  data_consumo: {
    type: Sequelize.DATEONLY,
    allowNull: true,
  },
  avaliação: {
    type: Sequelize.DECIMAL(3,1),
    allowNull: true,
    validate: {
      min: 0,               // limite inferior
      max: 10                // limite superior
    }
  },
  id_vinho: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
});

module.exports = { Garrafa, GarrafaModel };
