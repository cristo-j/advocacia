//validacao de schema
const Ajv = require('ajv');
const ajv = new Ajv();
const schema = require('../schemas/advogado/novoAdvogado.js');
const validacao = ajv.compile(schema);
const localize = require('ajv-i18n/localize/pt-BR');
//models
const models = require('../models/index.js');
const Advogado = models.advogado.Advogado;

class AdvogadoController {
  findAll(request, response) {
    const processoModel = models.processo.ProcessoModel;
    Advogado.findAll(processoModel)
      .then((data) => {
        if (data) {
          return response.status(200).json(data);
        } else {
          return response.status(404).json({
            message: 'advogado nao encontrado',
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
    Advogado.findByPk(id)
      .then((data) => {
        if (data) {
          return response.status(200).json(data);
        } else {
          return response.status(404).json({
            message: 'advogado nao encontrado',
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
      // Aplica a tradução para pt-BR nos erros
      localize(validacao.errors);
      let mensagem = validacao.errors[0].instancePath.replace('/', '');
      mensagem += ' ' + validacao.errors[0].message;
      return response.status(400).json({
        message: mensagem,
      });
    }
    Advogado.findByOab(request.body.oab)
      .then((existente) => {
        if (existente) {
          return Promise.reject({ status: 400, message: 'Número de OAB já está em uso por outro advogado.' });
        }
        return Advogado.create(request.body);
      })
      .then((data) => {
        return response.status(201).json(data);
      })
      .catch((erro) => {
        return response.status(500).json({
          message: 'erro no servidor: ' + erro.message,
        });
      });
  }

  update(request, response) {
    let validacoes = validacao(request.body);
    if (!validacoes) {
      localize(validacao.errors);
      let mensagem = validacao.errors[0].instancePath.replace('/', '');
      mensagem += ' ' + validacao.errors[0].message;
      return response.status(400).json({ message: mensagem });
    }

    const id = parseInt(request.params.id, 10);

    Advogado.findByPk(id)
      .then((advogado) => {
        if (!advogado) {
          return Promise.reject({ status: 404, message: 'Advogado não encontrado.' });
        }

        return Advogado.findByOabExcluindoId(request.body.oab, id);
      })
      .then((existente) => {
        if (existente) {
          return Promise.reject({ status: 400, message: 'Número de OAB já está em uso por outro advogado.' });
        }

        return Advogado.update(request.body, id);
      })
      .then((atualizado) => {
        if (!atualizado) {
          return Promise.reject({ status: 500, message: 'Erro ao atualizar advogado.' });
        }

        return Advogado.findByPk(id);
      })
      .then((advogadoAtualizado) => {
        return response.status(200).json(advogadoAtualizado);
      })
      .catch((erro) => {
        const status = erro.status || 500;
        const message = erro.message || 'Erro interno no servidor.';
        if (status !== 500) {
          return response.status(status).json({ message });
        }

        if (erro.name === 'SequelizeUniqueConstraintError') {
          return response.status(400).json({
            message: 'Número de OAB já está em uso por outro advogado.',
          });
        }

        console.error('Erro no update:', erro);
        return response.status(500).json({ message });
      });
  }

  delete(request, response) {
    const id = request.params.id;
    Advogado.delete(id)
      .then((removido) => {
        if (removido) {
          return response.status(200).json({
            message: 'advogado excluido com sucesso',
          });
        } else {
          return response.status(404).json({
            message: 'advogado nao encontrado',
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
module.exports = new AdvogadoController();
