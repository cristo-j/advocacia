const models = require('../models/index.js');
const Processo = models.processo.Processo;
const Ajv = require('ajv');
const ajv = new Ajv();
const schema = require('../schemas/processo/novoProcesso.js');
const validacao = ajv.compile(schema);
const localize = require('ajv-i18n/localize/pt-BR');

class ProcessoController {
  findByAdvogado(request, response) {
    Processo.findAllByAdvogadoId(request.params.id_advogado)
      .then((processos) => {
        if (processos && processos.length > 0) {
          return response.status(200).json(processos);
        }
        return response.status(404).json({ message: 'Nenhum processo encontrado para este Advogado' });
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

    const processoParaCriar = {
      ...request.body,
      id_advogado: request.params.id_advogado,
    };

    Processo.create(processoParaCriar)
      .then((novoprocesso) => {
        return response.status(201).json(novoprocesso);
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

    const { id_advogado, id_processo } = request.params;

    Processo.update(request.body, id_advogado, id_processo)
        .then(num => {
        if (num == 1) {
            ProcessoModel.findOne(id_advogado, id_processo).then(data => {
                response.send(data);
            });
        } else {
            response.send({
            message: `Não foi possível atualizar o processo com id=${id_processo}. Talvez o processo não foi encontrado ou o req.body está vazio!`
            });
        }
        })
        .catch(err => {
        response.status(500).send({
            message: "Erro ao atualizar o processo com id=" + id_processo
        });
        });
}

delete(request, response) {
    const { id_advogado, id_processo } = request.params;
    Processo.delete( id_advogado, id_processo)
      .then((removido) => {
        if (removido) {
          return response.status(200).json({
            message: `processo ${id_processo} do Advogado ${id_advogado} excluido com sucesso`,
          });
        } else {
          return response.status(404).json({
            message: `processo ${id_processo} do Advogado ${id_advogado} nao encontrado`,
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
    const { id_advogado, id_processo } = request.params;
    Processo.findOne(id_advogado, id_processo)
      .then((data) => {
        if (data) {
          return response.status(200).json(data);
        } else {
          return response.status(404).json({
            message: `processo ${id_processo} do Advogado ${id_advogado} nao encontrado`,
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

module.exports = new ProcessoController();
