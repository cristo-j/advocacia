//validacao de schema
const Ajv = require('ajv');
const addFormats = require("ajv-formats");
const ajv = new Ajv();
addFormats(ajv);
const schema = require('../schemas/vinho/novoVinho.js');
const validacao = ajv.compile(schema);
const localize = require('ajv-i18n/localize/pt-BR');
//models
const models = require('../models/index.js');
const Vinho = models.vinho.Vinho;


class VinhoController {
  findAll(request, response) {
    const garrafaModel = models.garrafa.GarrafaModel;
    Vinho.findAll(garrafaModel)
      .then((data) => {
        if (data) {
          return response.status(200).json(data);
        } else {
          return response.status(404).json({
            message: 'Vinho nao encontrado',
          });
        }
      })
      .catch((erro) => {
        response.status(500).json({
          message: erro.message,
        });
      });
  }

  find(request, response) {
    const id = request.params.id;
    Vinho.findByPk(id)
      .then((data) => {
        if (data) {
          return response.status(200).json(data);
        } else {
          return response.status(404).json({
            message: 'Vinho nao encontrado',
          });
        }
      })
      .catch((erro) => {
        return response.status(500).json({
          message: erro.message,
        });
      });
  }

  create(request, response) {
    let validacoes = validacao(request.body);
    if (!validacoes) {
      let mensagem = validacao.errors[0].instancePath.replace('/', '');
      mensagem += ' ' + validacao.errors[0].message;
      return response.status(400).json({
        message: mensagem,
      });
    }

    Vinho.create(request.body)
      .then((data) => {
        return response.status(201).json(data);
      })
      .catch((erro) => {
        return response.status(500).json({
          message: 'Ocorreu algum problema no servidor.' + erro.message,
        });
      });
  }

  update(request, response) {
    const id = request.params.id;

    Vinho.findByPk(id)
      .then((buscaVinho) => {
        if (buscaVinho === null) {
          return response.status(404).json({
            message: 'Vinho nao encontrado.',
          });
        } else {
          Vinho.update(request.body, id).then((atualizado) => {
            if (atualizado) {
              Vinho.findByPk(id).then((jogadorAtualizado) => {
                return response.status(200).json(jogadorAtualizado);
              });
            } else {
              return response.status(500).json({
                message: 'Ocorreu algum problema no servidor.',
              });
            }
          });
        }
      })
      .catch((erro) => {
        return response.status(500).json({
          message: erro.message,
        });
      });
  }

  delete(request, response) {
    const id = request.params.id;
    Vinho.delete(id)
      .then((removido) => {
        if (removido) {
          return response.status(200).json({
            message: 'Vinho excluido com sucesso',
          });
        } else {
          return response.status(404).json({
            message: 'Vinho nao encontrado',
          });
        }
      })
      .catch((erro) => {
        response.status(500).json({
          message: erro.message,
        });
      });
  }
}
module.exports = new VinhoController();
