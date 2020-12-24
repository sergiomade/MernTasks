const express   = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');

// crear el servidor
const app = express();

// conecta a la base de datos
conectarDB();

// Set up a whitelist
var whitelist = ['https://vibrant-mcclintock-370cc5.netlify.app']
var corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}

// Habilitar cors
app.use(cors(corsOptions));

// Habilitar express.json
app.use( express.json({ extended: true}) );

// Puerto de la app
const port = process.env.port || 4000;

// Importar rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/proyectos', require('./routes/proyectos'));
app.use('/api/tareas', require('./routes/tareas'));

// Arrancar la app
app.listen(port, '0.0.0.0', () => {
    console.log(`el servidor esta escuchando en el puerto ${port}`);
})
