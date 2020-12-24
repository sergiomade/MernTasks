// Rutas para proyectos
const express = require('express');
const router = express.Router();
const proyectoController = require('../controllers/proyectoController');
const auth = require('../middleware/auth');
const { check } = require('express-validator'); 

// Crear Proyectos
// api/proyectos
router.post('/',
    auth,
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty()
    ],
    proyectoController.crearProyecto
)

// Obtener todos los Proyectos
router.get('/',
    auth,
    proyectoController.obtenerProyectos
)

// Actualizar un Proyecto via el ID
router.put('/:id',
    auth,
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty()
    ],
    proyectoController.actualizarProyecto
)

// Eliminar un Proyecto via el ID
router.delete('/:id',
    auth,
    proyectoController.eliminarProyecto
)

module.exports = router;