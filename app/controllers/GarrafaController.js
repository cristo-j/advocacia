const models = require('../models/index.js');
const Garrafa = models.garrafa.Garrafa;
const Ajv = require('ajv');
const addFormats = require("ajv-formats");
const ajv = new Ajv();
addFormats(ajv);
const schema = require('../schemas/garrafa/novaGarrafa.js');
const validacao = ajv.compile(schema);
const localize = require('ajv-i18n/localize/pt-BR');

class GarrafaController {
  findByVinho(request, response) {
    Garrafa.findAllByVinhoId(request.params.id_vinho)
      .then((garrafas) => {
        if (garrafas && garrafas.length > 0) {
          return response.status(200).json(garrafas);
        }
        return response.status(404).json({ message: 'Nenhuma garrafa encontrada para este Vinho' });
      })
      .catch((error) => {
        return response.status(500).json({ message: error.message });
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

    const garrafaParaCriar = {
      ...request.body,
      id_vinho: request.params.id_vinho,
    };

    Garrafa.create(garrafaParaCriar)
      .then((novoGarrafa) => {
        return response.status(201).json(novoGarrafa);
      })
      .catch((erro) => {
        return response.status(500).json({ message: 'erro no servidor: ' + erro.message });
      });
  }



  update(request, response) {
    let validacoes = validacao(request.body);
    if (!validacoes) {
        let mensagem = validacao.errors[0].instancePath.replace('/', '');
        mensagem += ' ' + validacao.errors[0].message;
        return response.status(400).json({
        message: mensagem,
        });
    }

    const { id_vinho, id_garrafa } = request.params;

    Garrafa.update(request.body, id_vinho, id_garrafa)
        .then(num => {
        if (num == 1) {
            Garrafa.findOne(id_vinho, id_garrafa).then(data => {
                response.send(data);
            });
        } else {
            response.send({
            message: `Não foi possível atualizar o garrafa com id=${id_garrafa}. Talvez o garrafa não foi encontrada ou o req.body está vazio!`
            });
        }
        })
        .catch(err => {
        response.status(500).send({
            message: "Erro ao atualizar o garrafa com id=" + id_garrafa
        });
        });
}

  delete (request, response) {
        const { id_vinho, id_garrafa } = request.params;
        Garrafa.delete(id_vinho, id_garrafa)
          .then((removido) => {
            if (removido) {
              return response.status(200).json({
                message: `garrafa ${id_garrafa} do Vinho ${id_vinho} excluida com sucesso`,
              });
            } else {
              return response.status(404).json({
                message: `Garrafa ${id_garrafa} do Vinho ${id_vinho} nao encontrada.`,
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
        const { id_vinho, id_garrafa } = request.params;
        Garrafa.findOne(id_vinho, id_garrafa)
          .then((data) => {
            if (data) {
              return response.status(200).json(data);
            } else {
              return response.status(404).json({
                message: `Garrafa ${id_garrafa} do Vinho ${id_vinho} nao encontrada.`,
              });
            }
          })
          .catch((erro) => {
            return response.status(500).json({
              message: erro.message,
            });
          });
      }
}

module.exports = new GarrafaController();
