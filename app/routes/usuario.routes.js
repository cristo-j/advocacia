const express = require('express');
var router = express.Router();
const usuarioController = require('../controllers/UsuarioController.js');

router.post('/usuario', usuarioController.create);
router.post('/usuario/login', usuarioController.login);

module.exports = router;
