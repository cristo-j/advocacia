const Sequelize = require('sequelize');
const db = require('./conexao.js');
const { type } = require('../schemas/advogado/novoAdvogado.js');

class Processo {
  #descricao;
  #numero_processo;
  #status;

  construct() {}

  get numero_processo() {
    return this.#numero_processo;
  }
  set numero_processo(numero_processo) {
    this.#numero_processo = numero_processo;
  }

  get descricao() {
    return this.#descricao;
  }
  set descricao(descricao) {
    this.#descricao = descricao;
  }

  get status() {
    return this.#status;
  }
  set status(status) {
    this.#status = status;
  }

  static findAllByAdvogadoId(id_advogado) {
    return ProcessoModel.findAll({ where: { id_advogado } });
  }

  static create(novoProcesso) {
    return ProcessoModel.create(novoProcesso);
  }

  
  static async findByNumeroProcesso(numero_processo) {
    const [results] = await db.query(
      'SELECT * FROM processo WHERE numero_processo = ? LIMIT 1',
      {
        replacements: [numero_processo],
        type: Sequelize.QueryTypes.SELECT,
      }
    );

    return results || null;
  }

    static async findByNumeroProcessoExcluindoId(numero_processo, id) {
    const [results] = await db.query(
      'SELECT * FROM processo WHERE numero_processo = ? AND id != ? LIMIT 1',
      {
        replacements: [numero_processo, id],
        type: Sequelize.QueryTypes.SELECT,
      }
    );

    return results || null;
  }

static update(dados, id_advogado, id_processo) {
    return ProcessoModel.update(dados, {
        where: { id: id_processo, id_advogado: id_advogado }
        });
    }

static findOne(id_advogado, id_processo) {
    return ProcessoModel.findOne({ where: { id: id_processo, id_advogado: id_advogado } });
}


  static async delete( id_advogado, id_processo) {
    try {
      const data = await await ProcessoModel.findOne({
      where: {
        id_advogado: id_advogado,
        id: id_processo
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

const ProcessoModel = db.define('processo', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  numero_processo: {
    type: Sequelize.STRING(25),
    allowNull: false,
    unique: true,
  },
  descricao: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  status: {
    type: Sequelize.STRING(20),
    allowNull: false,
  },
  id_advogado: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
});

module.exports = { Processo, ProcessoModel };
