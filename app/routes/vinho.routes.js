const express = require('express');
var router = express.Router();
const vinhoController = require('../controllers/VinhoController.js');
const garrafaController = require('../controllers/GarrafaController.js');
const authMiddleware = require('../middlewares/TokenValido.js');

/**
 * @swagger
 * tags:
 *   - name: vinho
 *     description: Rotas para gerenciar vinhos
 *   - name: garrafa
 *     description: Rotas para gerenciar garrafas de um vinho
 */


//retorna todos os vinhos
/**
 * @swagger
 * /vinho:
 *   get:
 *     summary: Lista todos os vinhos
 *     description: Retorna uma lista com todos os vinhos e seus garrafas.
 *     tags: [vinho]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Lista de vinhos retornada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/vinho'
 *       '401':
 *         description: Não autorizado.
 */

router.get('/vinho', [authMiddleware.check], vinhoController.findAll);

//recupera um vinho pelo seu id
/**
 * @swagger
 * /vinho/{id}:
 *   get:
 *     summary: Recupera um vinho pelo seu ID
 *     description: Busca e retorna os dados de um vinho específico.
 *     tags: [vinho]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: O ID do vinho.
 *     responses:
 *       '200':
 *         description: Dados do vinho.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/vinho'
 *       '404':
 *         description: vinho não encontrado.
 */

router.get('/vinho/:id', [authMiddleware.check], vinhoController.find);

//cria um novo vinho
/**
 * @swagger
 * /vinho:
 *   post:
 *     summary: Cria um novo vinho
 *     description: Cadastra um novo vinho no sistema.
 *     tags: [vinho]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post_Edit_vinho'
 *     responses:
 *       '201':
 *         description: vinho criado com sucesso.
 *       '400':
 *         description: Dados inválidos.
 */

router.post('/vinho', [authMiddleware.check], vinhoController.create);

//atualiza um vinho pelo seu id
/**
 * @swagger
 * /vinho/{id}:
 *   put:
 *     summary: Atualiza um vinho pelo seu ID
 *     description: Atualiza um vinho no sistema.
 *     tags: [vinho]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: O ID do vinho.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post_Edit_vinho'
 *     responses:
 *       '201':
 *         description: vinho atualizado com sucesso.
 *       '400':
 *         description: Dados inválidos.
 */

router.put('/vinho/:id', [authMiddleware.check], vinhoController.update);

//exclui um vinho pelo seu id
/**
 * @swagger
 * /vinho/{id}:
 *   delete:
 *     summary: Exclui um vinho pelo seu ID
 *     description: Exclui os dados de um vinho específico.
 *     tags: [vinho]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: O ID do vinho.
 *     responses:
 *       '200':
 *         description: vinho excluido com sucesso.
 *       '404':
 *         description: vinho não encontrado.
 */

router.delete('/vinho/:id', [authMiddleware.check], vinhoController.delete);

//retorna todos os garrafas de um vinho
/**
 * @swagger
 * /vinho/{id_vinho}/garrafa:
 *   get:
 *     summary: Lista todos os todos os garrafas de um vinho
 *     description: Retorna uma lista com todos os vinhos e seus garrafas.
 *     tags: [garrafa]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_vinho
 *         required: true
 *         schema:
 *           type: integer
 *         description: O ID do vinho.
 *     responses:
 *       '200':
 *         description: Lista de garrafas do vinho retornada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/garrafa'
 *       '401':
 *         description: Não autorizado.
 */


router.get('/vinho/:id_vinho/garrafa', [authMiddleware.check], garrafaController.findByVinho);

//recupera um garrafa de um vinho pelo id do garrafa
/**
 * @swagger
 * /vinho/{id_vinho}/garrafa/{id_garrafa}:
 *   get:
 *     summary: Recupera um garrafa de um vinho pelo id do garrafa
 *     description: Busca e retorna os dados de um garrafa específico de um vinho.
 *     tags: [garrafa]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_vinho
 *         required: true
 *         schema:
 *           type: integer
 *         description: O ID do vinho.
 *       - in: path
 *         name: id_garrafa
 *         required: true
 *         schema:
 *           type: integer
 *         description: O ID do garrafa.
 *     responses:
 *       '200':
 *         description: Dados do garrafa.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/garrafa'
 *       '404':
 *         description: garrafa não encontrado.
 */

router.get('/vinho/:id_vinho/garrafa/:id_garrafa', [authMiddleware.check], garrafaController.find);

//cria um novo garrafa para um vinho

/**
 * @swagger
 * /vinho/{id_vinho}/garrafa:
 *   post:
 *     summary: Cria um novo garrafa para um vinho
 *     description: Cadastra um novo garrafa para um vinho no sistema
 *     tags: [garrafa]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_vinho
 *         required: true
 *         schema:
 *           type: integer
 *         description: O ID do vinho.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post_Edit_garrafa'
 *     responses:
 *       '201':
 *         description: garrafa criado com sucesso.
 *       '400':
 *         description: Dados inválidos.
 */

router.post('/vinho/:id_vinho/garrafa', [authMiddleware.check], garrafaController.create);

//atualiza um garrafa de um vinho

/**
 * @swagger
 * /vinho/{id_vinho}/garrafa/{id_garrafa}:
 *   put:
 *     summary: Atualiza um garrafa de um vinho pelo seu ID
 *     description: Atualiza um garrafa de um vinho pelo seu ID no sistema.
 *     tags: [garrafa]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_vinho
 *         required: true
 *         schema:
 *           type: integer
 *         description: O ID do vinho.
 *       - in: path
 *         name: id_garrafa
 *         required: true
 *         schema:
 *           type: integer
 *         description: O ID do garrafa.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post_Edit_vinho'
 *     responses:
 *       '201':
 *         description: garrafa atualizado com sucesso.
 *       '400':
 *         description: Dados inválidos.
 */

router.put('/vinho/:id_vinho/garrafa/:id_garrafa', [authMiddleware.check], garrafaController.update);

//exclui um garrafa de um vinho pelo seu id

/**
 * @swagger
 * /vinho/{id_vinho}/garrafa/{id_garrafa}:
 *   delete:
 *     summary: Exclui um garrafa de um vinho pelo seu id
 *     description: Exclui os dados de um garrafa específico de um vinho específico.
 *     tags: [garrafa]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_vinho
 *         required: true
 *         schema:
 *           type: integer
 *         description: O ID do vinho.
 *       - in: path
 *         name: id_garrafa
 *         required: true
 *         schema:
 *           type: integer
 *         description: O ID do garrafa.
 *     responses:
 *       '200':
 *         description: garrafa excluido com sucesso.
 *       '404':
 *         description: garrafa não encontrado.
 */

router.delete('/vinho/:id_vinho/garrafa/:id_garrafa', [authMiddleware.check], garrafaController.delete);


module.exports = router;
