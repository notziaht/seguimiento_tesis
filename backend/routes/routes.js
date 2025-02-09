// Se invocan las librerias de JS a utilizar
const express = require('express');
const router = express.Router();
const db = require('../db/database');

// Conexion de prueba con el archivo '.env' y 'database.js
router.get('/test', async (req, res) => {
    try{
        const [rows] = await db.query('SELECT * FROM tesis');
        res.json({
            message: "Conectado a la base de datos.",
            timestamp: rows[0].tesis
        })
    } catch (error){
        console.log("Error en la conexion.", error);
        res.status(500).json({
            message: "Error en la conexion",
            error: error,
        })
    }
})

router.get('/tesista', async (req, res) => {
    try{
        const [rows] = await db.query('SELECT * FROM tesista');
        res.json({
            message: "Conectado a la base de datos.",
            timestamp: rows[0].tesista
        })
    } catch (error){
        console.log("Error en la conexion.", error);
        res.status(500).json({
            message: "Error en la conexion",
            error: error,
        })
    }
})

module.exports = router;