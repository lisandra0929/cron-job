const express = require('express');
const router = express.Router();
const asistenciaController = require('../controllers/asistenciaController');

// Generar lista de asistencia
router.post('/generar', asistenciaController.generarLista);

// Obtener asistencias por fecha y tipo
router.get('/', asistenciaController.obtenerAsistenciasPorFechaYTipo);

// Obtener todas las listas de asistencia
router.get('/todas', asistenciaController.obtenerTodasLasListas);

// Actualizar asistencia basada en fecha, tipo, nombres y apellidos
router.patch('/actualizar-asistencia', asistenciaController.actualizarAsistencia);

// Actualizar fecha y tipo de una lista existente
router.patch('/actualizar-lista', asistenciaController.actualizarLista);

// Eliminar lista de asistencia (espera fecha y tipo en el body)
router.delete('/eliminar', asistenciaController.eliminarLista);

module.exports = router;