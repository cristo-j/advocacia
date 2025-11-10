const express = require('express');
var router = express.Router();
const usuarioController = require('../controllers/UsuarioController.js');

/**
 * @swagger
 * tags:
 *   - name: usuario
 *     description: Rotas para gerenciar usuarios

 */


//cria um novo usuário
/**
 * @swagger
 * /usuario:
 *   post:
 *     summary: Cria um novo usuário
 *     description: Cadastra um novo usuário no sistema.
 *     tags: [usuario]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/usuario'
 *     responses:
 *       '201':
 *         description: usuário criado com sucesso.
 *       '400':
 *         description: Dados inválidos.
 */

router.post('/usuario', usuarioController.create);

//permite fazer o login no sistema
/**
 * @swagger
 * /usuario/login:
 *   post:
 *     summary: Permite fazer o login no sistema
 *     description: Faz o login no sistema.
 *     tags: [usuario]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/login'
 *     responses:
 *       '201':
 *         description: usuário criado com sucesso.
 *       '400':
 *         description: Dados inválidos.
 */

router.post('/usuario/login', usuarioController.login);

module.exports = router;
