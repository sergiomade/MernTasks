// Rutas para authenticar usuarios
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');

// Iniciar Sesion
// api/auth
router.post('/',
    authController.autenticarUsuario
);

// Obtiene usuario authenticado
router.get('/',
    auth,
    authController.usuarioAutenticado
);

module.exports = router;