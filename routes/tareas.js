// Rutas para tareas
const express = require('express');
const router = express.Router();
const tareaController = require('../controllers/tareaController');
const auth = require('../middleware/auth');
const { check } = require('express-validator'); 

// Crear una Tarea
// api/tareas
router.post('/',
    auth,
    [
        check('nombre', 'El nombre de la tarea es obligatorio').not().isEmpty(),
        check('proyecto', 'El proyecto es obligatorio').not().isEmpty()
    ],
    tareaController.crearTarea
);

// Obtener las tareas de un proyecto
router.get('/',
    auth,
    tareaController.obtenerTareas
);

// Actualizar una tarea
router.put('/:id',
    auth,
    tareaController.actualizarTarea
);

// Eliminar una tarea por su ID
router.delete('/:id',
    auth,
    tareaController.eliminarTarea
);

module.exports = router;