const express = require('express');
const router = express.Router();
const admTareaController = require('../controllers/admTareaController');

// Rutas para las operaciones administrativas
router.post('/', admTareaController.crearTarea);
router.get('/', admTareaController.obtenerTareas);
router.put('/:id', admTareaController.actualizarTarea);
router.delete('/:id', admTareaController.eliminarTarea);

module.exports = router;