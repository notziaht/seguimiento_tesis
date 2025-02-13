const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config();

const routes = require('./routes/routes.js');

// Se carga la dependencia Express en una constantes
const app = express();

// Middleware: gestiona y facilita la comunicación entre el cliente (navegador) y el servidor, o entre diferentes partes de la aplicación web.
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

// Ruta de ejemplo
app.get('/api/tesis', (req, res) => {
    const items = [
        {   id: 1, nombre: 'Juancho', apellido: 'Castañares'},
        {   id: 1, nombre: 'Josefina', apellido: 'Zuñiga'},
        {   id: 1, nombre: 'Julia', apellido: 'Rios'},
        {   id: 1, nombre: 'Jacome', apellido: 'Loaiza'},
    ]
    res.json(items);
})

app.use('/api', routes);

// Ruta de bienvenida
app.get('/', (req, res) => {
    res.json({
        message: "Bienvenido al backend del Sistema de Seguimiento de Tesis"
    })
})

// Manejo de errores
app.use((req, res, next) => {
    console.error("Ruta no encontrada", error.stack);
    res.status(504).json({
        status: "error",
        message: "Algo salió mal."
    })
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
    console.log(`Servidor ejecutandose en el puerto ${PORT}`)
);