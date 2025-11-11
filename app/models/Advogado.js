const Sequelize = require('sequelize');
const db = require('./conexao.js');

class Advogado {
  #nome;
  #oab;
  #especialidade;

  // constructor(nome, oab, especialidade ) {
  constructor() {}

  get nome() {
    return this.#nome;
  }
  set nome(nome) {
    this.#nome = nome;
  }

  get oab() {
    return this.#oab;
  }
  set oab(oab) {
    this.#oab = oab;
  }

  get especialidade() {
    return this.#especialidade;
  }
  set especialidade(especialidade) {
    this.#especialidade = especialidade;
  }

  static async findByPk(id) {
    try {
      const resultado = await AdvogadoModel.findByPk(id);
      if (resultado) {
        return resultado;
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  }

  static async findAll(processo) {
    try {
      const resultados = await AdvogadoModel.findAll({ include: processo }); //{where ...}
      if (resultados) {
        return resultados;
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  }

  static async create(novoAdvogado) {
    try {
      const advogado = await AdvogadoModel.create({
        nome: novoAdvogado.nome,
        oab: novoAdvogado.oab,
        especialidade: novoAdvogado.especialidade,
      });
      return advogado;
    } catch (error) {
      throw error;
    }
  }

  static async update(dados, idadvogado) {
    try {
      const resultado = await AdvogadoModel.update(dados, { where: { id: idadvogado } });

      console.log('update model', resultado);
      if (resultado) {
        return resultado;
      } else {
        return false;
      }
    } catch (error) {
      throw error;
    }
  }

  static async delete(id) {
    try {
      const data = await AdvogadoModel.findByPk(id);
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

const AdvogadoModel = db.define('advogado', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  nome: {
    type: Sequelize.STRING(50),
    allowNull: false,
  },
  oab: {
    type: Sequelize.STRING(10),
    allowNull: false,
    unique: true,
  },
  especialidade: {
    type: Sequelize.STRING(50),
    allowNull: false,
  },

});

module.exports = { Advogado, AdvogadoModel };
