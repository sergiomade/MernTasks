const Tarea = require('../models/Tarea');
const Proyecto = require('../models/Proyecto');
const { validationResult } = require('express-validator');


//Crea una nueva tarea
exports.crearTarea = async (req, res) => {

    // Validar que no haya un error
    const errores = validationResult(req);
    if(!errores.isEmpty()) {
        return res.status(400).json({errores: errores.array() });
    }
        
    try {

        // Extraer el proyecto y comprobar si existe
        const { proyecto } = req.body;
        
        const existeProyecto = await Proyecto.findById(proyecto);
        if(!existeProyecto) {
            return res.status(404).json({msg: 'Proyecto no encontrado'});
        }    

        // Revisar si el proyecto actual pertenece al usuario autenticado
        if( existeProyecto.creador.toString() !== req.usuario.id ) {
            return res.status(401).json({ msg: 'Acceso No autorizado'});
        }

        // Creamos la tarea
        const tarea = new Tarea(req.body);
        await tarea.save();
        res.json({ tarea });

        } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error en el servidor');
    }

}

// Obtiene las tareas de un proyecto
exports.obtenerTareas = async (req, res) => {
    
   try {
    
    // Obtener el proyecto
    const { proyecto } = req.query;

    // Cargar en proyecto en una variable y valida que existe
    const existeProyecto = await Proyecto.findById(proyecto);
    if( !existeProyecto ) {
        return res.status(404).json({ msg: 'Proyecto no encontrado'});
    }

    // Revisar si el proyecto actual pertenece al usuario logueado
    if ( existeProyecto.creador.toString() !== req.usuario.id ) {
        return res.status(401).json({msg: 'No Autorizado'});
    }

    // Obtener las tareas por proyecto
   const tareas = await Tarea.find({ proyecto }).sort({ creado: -1});
   res.json({tareas});

   } catch (error) {
       console.log(error);
       res.status(500).send('Hubo un error en el servidor');
   }
}

// Actualizar una tarea
exports.actualizarTarea = async (req, res) => {
    try {

        // Obtener el proyecto
      const { proyecto, nombre, estado } = req.body;
      
      // Si la tarea existe o no
      let tarea = await Tarea.findById( req.params.id );

      if ( !tarea ) {
          return res.status(404).json({ msg: 'No existe la tarea'});
      }

      const existeProyecto = await Proyecto.findById( proyecto );
      
      // Validar que el proyecto es del usuario logueado
      if ( existeProyecto.creador.toString() !== req.usuario.id ) {
          return res.status(401).json({ msg: 'Not Autorizado'});
      }

      // Crear un objeto con la nueva informacion
      const nuevaTarea = {};

      nuevaTarea.nombre = nombre;
      nuevaTarea.estado = estado;
     
      // Guardar la tarea
      tarea = await Tarea.findOneAndUpdate( {_id: req.params.id }, nuevaTarea, { new: true} );
      res.json( {tarea} );

    } catch (error) {
        console.log(error);
        return res.status(500).send('Hubo un error en el servidor');
    }
}


// Eliminar una tarea por su ID
exports.eliminarTarea = async (req, res) => {
    try {

        // Obtener el proyecto
        const { proyecto } = req.query;

        // Si existe la tarea si o no
        const tarea = await Tarea.findById( req.params.id );

        if ( !tarea ) {
            return res.status(404).json({msg: 'La tarea no existe'});
        } 

        // Validar el proyecto de la tarea
        const existeProyecto = await Proyecto.findById( proyecto );

        // Validar que el usuario es el dueno del proyecto
        if( existeProyecto.creador.toString() !== req.usuario.id ) {
            return res.status(401).json({msg: 'Acceso Restringido'});
        }

        // Eliminar Tarea
        await Tarea.findOneAndRemove( {_id: req.params.id } );
        res.json({msg: 'Tarea Eliminada'});
        
    } catch (error) {
        console.log(error);
        return res.status(500).send('Hubo un error en el servidor');
    }
}