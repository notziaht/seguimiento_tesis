// Se invocan las librerias de JS a utilizar
const express = require('express');
const router = express.Router();
const db = require('../db/database');

// Conexion de prueba con el archivo '.env' y 'database.js


// Ruta para acceder a la tabla de tesis

router.get('/tesis', async (req, res) => {
    try{
        const [tesis] = await db.query('SELECT * FROM tesis');
        res.json({
            message: "Conectado a la base de datos.",
            status: "success",
            data: tesis
        })
    } catch (error){
        console.log("Error en la conexion.", error);
        res.status(500).json({
            message: "Error en la conexion",
            error: error,
        })
    }
})


// ------------------------------------ TABLA TESISTAS ------------------------------------
// Ruta para acceder a la tabla de tesistas

router.get('/tesistas', async (req, res) => {
    try{
        const [tesistas] = await db.query('SELECT * FROM tesistas');
        res.json({
            message: "Conectado a la base de datos.",
            status: "success",
            data: tesistas
        })
    } catch (error){
        console.log("Error en la conexion.", error);
        res.status(500).json({
            message: "Error en la conexion",
            error: error,
        })
    }
})

// Obtener un registro de tesista con GET

router.get('/tesistas/:id', async (req, res) => {
    try{
        const {id} = req.params;
        const [tesista] = await db.query('SELECT * FROM tesistas where id=?', [id]);

        if (tesista.length === 0){
            return res.status(404).json({
                status: "error",
                message: "No se encontró el tesista."
            })
        }

        res.json({
            message: "Conectado a la base de datos.",
            status: "success",
            data: tesista[0]
        })
    } catch (error){
        console.log("Error en la conexion.", error);
        res.status(500).json({
            message: "Error en la conexion",
            error: error,
        })
    }
})

// Crear un tesista con POST

router.post('/tesista', async(req, res) => {
    try {
        const {nombres, apellidos, tipo_documento, nro_documento, nro_celular} = req.body;
        // Validación de campos antes de guardar
        if (!nombres || !apellidos || !tipo_documento || !nro_documento || !nro_celular){
            return res.status(400).json({
                status: error,
                message: "Todos los campos son obligatorios"
            })
        };
        // Consulta SQL adecuada para la insercion del registro en la base de datos
        const [result] = await db.query('INSERT INTO tesistas(nombres, apellidos, tipo_documento, nro_documento, nro_celular) VALUES (?,?,?,?,?)', 
            [nombres, apellidos, tipo_documento, nro_documento, nro_celular]
        );

        res.status(201).json({
            status: "success",
            message: "Tesista creado exitosamente.",
            data: {
                id: result.insertId,
                nombres, 
                apellidos, 
                tipo_documento, 
                nro_documento, 
                nro_celular
            }
        })

    }catch(error){
        console.error("Error al crear el tesista", error);
    };
})

// Actualizar registro con PUT

router.put('/tesista/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const {nombres, apellidos, tipo_documento, nro_documento, nro_celular} = req.body;
        // Validación de campos antes de guardar
        if (!nombres || !apellidos || !tipo_documento || !nro_documento || !nro_celular){
            return res.status(400).json({
                status: error,
                message: "Todos los campos son obligatorios"
            })
        };
        // Consulta SQL para verificar si el registro existe
        const [tesista] = await db.query('SELECT * FROM tesistas WHERE id=?', [id]);

        if (tesista.length === 0){
            return res.status(404).json({
                status: "error",
                message: "No se encontró el tesista."
            })
        }
        // Consulta SQL adecuada para la actualizacion del registro en la base de datos
        const [result] = await db.query('UPDATE tesistas SET nombres=?, apellidos=?, tipo_documento=?, nro_documento=?, nro_celular=?)', 
            [nombres, apellidos, tipo_documento, nro_documento, nro_celular]
        );

        res.status(201).json({
            status: "success",
            message: "Tesista actualizado exitosamente.",
            data: {
                id: result.insertId,
                nombres, 
                apellidos, 
                tipo_documento, 
                nro_documento, 
                nro_celular
            }
        })

    }catch(error){
        console.error("Error al actualizar el tesista", error);
    };
})

// Eliminar registro con DELETE 

router.delete('/tesista/:id', async(req, res) => {
    try {
        const {id} = req.params;
        
        // Consulta SQL para verificar si el registro existe
        const [tesista] = await db.query('SELECT * FROM tesistas WHERE id=?', [id]);

        if (tesista.length === 0){
            return res.status(404).json({
                status: "error",
                message: "No se encontró el tesista."
            })
        }
        // Consulta SQL adecuada para la actualizacion del registro en la base de datos
        const [result] = await db.query('DELETE from tesistas WHERE id=?', [id]);

        res.status(201).json({
            status: "success",
            message: "Tesista eliminado exitosamente."
        })

    }catch(error){
        console.error("Error al eliminar el tesista", error);
    };
});

// ------------------------------------ Metodos de búsqueda ------------------------------------
// BÚSQUEDA POR CÉDULA/PASAPORTE
router.get('/tesistas/buscar/:nro_documento', async (req, res) => {
    try{
        const {nro_documento} = req.params;
        const [tesista] = await db.query('SELECT * FROM tesistas WHERE nro_documento=?', [nro_documento]);

        if (tesista.length === 0){
            return res.status(404).json({
                status: "error",
                message: "No se encontró el tesista."
            })
        }

        res.json({
            message: "Tesista encontrado exitosamente.",
            status: "success",
            data: tesista[0]
        })
    } catch (error){
        res.status(500).json({
            message: "Error al conseguir el tesista",
            error: error,
        })
    }
})

module.exports = router;