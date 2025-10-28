const express = require('express');
const router = express.Router();
const tareaController = require('../controllers/tareaController');

// Rutas para tareas
router.post('/', tareaController.crearTarea);
router.get('/', tareaController.obtenerTareas);
router.get('/proxima-fecha', tareaController.obtenerTareasProximaFecha);
router.put('/:id', tareaController.actualizarTarea);
router.delete('/:id', tareaController.eliminarTarea);
router.get('/por-fecha', tareaController.obtenerTareasPorFecha);

module.exports = router;