const Sequelize = require('sequelize');
const db = require('./conexao.js');

class Vinho {
  #nome;
  #produtor;
  #pais_origem;
  #tipo;
  #uva_casta;

  // constructor(nome, produtor, pais_origem, tipo, uva_casta) {
  constructor() { }

  get nome() {
    return this.#nome;
  }
  set nome(nome) {
    this.#nome = nome;
  }

  get produtor() {
    return this.#produtor;
  }
  set produtor(produtor) {
    this.#produtor = produtor;
  }

  get pais_origem() {
    return this.#pais_origem;
  }
  set pais_origem(pais_origem) {
    this.#pais_origem = pais_origem;
  }

  get tipo() {
    return this.#tipo;
  }
  set tipo(tipo) {
    this.#tipo = tipo;
  }

  get uva_casta() {
    return this.#uva_casta;
  }
  set uva_casta(uva_casta) {
    this.#uva_casta = uva_casta;
  }


  static async findByPk(id) {
    try {
      const resultado = await VinhoModel.findByPk(id);
      if (resultado) {
        return resultado;
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  }



  static async findAll(garrafa) {
    try {
      const resultados = await VinhoModel.findAll({ include: garrafa }); //{where ...}
      if (resultados) {
        return resultados;
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  }

  static async create(novoVinho) {
    try {
      const vinho = await VinhoModel.create({
        nome: novoVinho.nome,
        produtor: novoVinho.produtor,
        pais_origem: novoVinho.pais_origem,
        tipo: novoVinho.tipo,
        uva_casta: novoVinho.uva_casta,
      });
      return vinho;
    } catch (error) {
      throw error;
    }
  }

  static async update(dados, idvinho) {
    try {
      const resultado = await VinhoModel.update(dados, { where: { id: idvinho } });

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
      const data = await VinhoModel.findByPk(id);
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

const VinhoModel = db.define('vinho', {
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
  produtor: {
    type: Sequelize.STRING(50),
    allowNull: false,
  },
  pais_origem: {
    type: Sequelize.STRING(25),
    allowNull: true,
  },
  tipo: {
    type: Sequelize.STRING(20),
    allowNull: true,
  },
    uva_casta: {
    type: Sequelize.STRING(30),
    allowNull: true,
  },
});

module.exports = { Vinho, VinhoModel };
