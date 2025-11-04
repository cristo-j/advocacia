const express = require('express');
var router = express.Router();
const advogadoController = require('../controllers/AdvogadoController.js');
const processoController = require('../controllers/ProcessoController.js');
const authMiddleware = require('../middlewares/TokenValido.js');

/**
 * @swagger
 * tags:
 *   - name: advogado
 *     description: Rotas para gerenciar advogados
 *   - name: processo
 *     description: Rotas para gerenciar processos de um advogado
 */


//retorna todos os advogados
/**
 * @swagger
 * /advogado:
 *   get:
 *     summary: Lista todos os advogados
 *     description: Retorna uma lista com todos os advogados e seus processos.
 *     tags: [advogado]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Lista de advogados retornada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/advogado'
 *       '401':
 *         description: Não autorizado.
 */

router.get('/advogado', [authMiddleware.check], advogadoController.findAll);

//recupera um advogado pelo seu id
/**
 * @swagger
 * /advogado/{id}:
 *   get:
 *     summary: Recupera um advogado pelo seu ID
 *     description: Busca e retorna os dados de um advogado específico.
 *     tags: [advogado]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: O ID do advogado.
 *     responses:
 *       '200':
 *         description: Dados do advogado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/advogado'
 *       '404':
 *         description: advogado não encontrado.
 */

router.get('/advogado/:id', [authMiddleware.check], advogadoController.find);

//cria um novo advogado
/**
 * @swagger
 * /advogado:
 *   post:
 *     summary: Cria um novo advogado
 *     description: Cadastra um novo advogado no sistema.
 *     tags: [advogado]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post_Edit_advogado'
 *     responses:
 *       '201':
 *         description: advogado criado com sucesso.
 *       '400':
 *         description: Dados inválidos.
 */

router.post('/advogado', [authMiddleware.check], advogadoController.create);

//atualiza um advogado pelo seu id
/**
 * @swagger
 * /advogado/{id}:
 *   put:
 *     summary: Atualiza um advogado pelo seu ID
 *     description: Atualiza um advogado no sistema.
 *     tags: [advogado]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: O ID do advogado.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post_Edit_advogado'
 *     responses:
 *       '201':
 *         description: advogado atualizado com sucesso.
 *       '400':
 *         description: Dados inválidos.
 */

router.put('/advogado/:id', [authMiddleware.check], advogadoController.update);

//exclui um advogado pelo seu id
/**
 * @swagger
 * /advogado/{id}:
 *   delete:
 *     summary: Exclui um advogado pelo seu ID
 *     description: Exclui os dados de um advogado específico.
 *     tags: [advogado]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: O ID do advogado.
 *     responses:
 *       '200':
 *         description: advogado excluido com sucesso.
 *       '404':
 *         description: advogado não encontrado.
 */

router.delete('/advogado/:id', [authMiddleware.check], advogadoController.delete);

//retorna todos os processos de um advogado
/**
 * @swagger
 * /advogado/{id_advogado}/processo:
 *   get:
 *     summary: Lista todos os todos os processos de um advogado
 *     description: Retorna uma lista com todos os advogados e seus processos.
 *     tags: [processo]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_advogado
 *         required: true
 *         schema:
 *           type: integer
 *         description: O ID do advogado.
 *     responses:
 *       '200':
 *         description: Lista de processos do advogado retornada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/processo'
 *       '401':
 *         description: Não autorizado.
 */


router.get('/advogado/:id_advogado/processo', [authMiddleware.check], processoController.findByAdvogado);

//recupera um processo de um advogado pelo id do processo
/**
 * @swagger
 * /advogado/{id_advogado}/processo/{id_processo}:
 *   get:
 *     summary: Recupera um processo de um advogado pelo id do processo
 *     description: Busca e retorna os dados de um processo específico de um advogado.
 *     tags: [processo]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_advogado
 *         required: true
 *         schema:
 *           type: integer
 *         description: O ID do advogado.
 *       - in: path
 *         name: id_processo
 *         required: true
 *         schema:
 *           type: integer
 *         description: O ID do processo.
 *     responses:
 *       '200':
 *         description: Dados do processo.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/processo'
 *       '404':
 *         description: processo não encontrado.
 */

router.get('/advogado/:id_advogado/processo/:id_processo', [authMiddleware.check], processoController.find);

//cria um novo processo para um advogado

/**
 * @swagger
 * /advogado/{id_advogado}/processo:
 *   post:
 *     summary: Cria um novo processo para um advogado
 *     description: Cadastra um novo processo para um advogado no sistema
 *     tags: [processo]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_advogado
 *         required: true
 *         schema:
 *           type: integer
 *         description: O ID do advogado.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post_Edit_processo'
 *     responses:
 *       '201':
 *         description: processo criado com sucesso.
 *       '400':
 *         description: Dados inválidos.
 */

router.post('/advogado/:id_advogado/processo', [authMiddleware.check], processoController.create);

//atualiza um processo de um advogado

/**
 * @swagger
 * /advogado/{id_advogado}/processo/{id_processo}:
 *   put:
 *     summary: Atualiza um processo de um advogado pelo seu ID
 *     description: Atualiza um processo de um advogado pelo seu ID no sistema.
 *     tags: [processo]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_advogado
 *         required: true
 *         schema:
 *           type: integer
 *         description: O ID do advogado.
 *       - in: path
 *         name: id_processo
 *         required: true
 *         schema:
 *           type: integer
 *         description: O ID do processo.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post_Edit_advogado'
 *     responses:
 *       '201':
 *         description: processo atualizado com sucesso.
 *       '400':
 *         description: Dados inválidos.
 */

router.put('/advogado/:id_advogado/processo/:id_processo', [authMiddleware.check], processoController.update);

//exclui um processo de um advogado pelo seu id

/**
 * @swagger
 * /advogado/{id_advogado}/processo/{id_processo}:
 *   delete:
 *     summary: Exclui um processo de um advogado pelo seu id
 *     description: Exclui os dados de um processo específico de um advogado específico.
 *     tags: [processo]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_advogado
 *         required: true
 *         schema:
 *           type: integer
 *         description: O ID do advogado.
 *       - in: path
 *         name: id_processo
 *         required: true
 *         schema:
 *           type: integer
 *         description: O ID do processo.
 *     responses:
 *       '200':
 *         description: processo excluido com sucesso.
 *       '404':
 *         description: processo não encontrado.
 */

router.delete('/advogado/:id_advogado/processo/:id_processo', [authMiddleware.check], processoController.delete);


module.exports = router;
