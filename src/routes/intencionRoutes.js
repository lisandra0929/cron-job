
const express = require('express');
const router = express.Router();
const intencionController = require('../controllers/intencionController');
// Obtener el siguiente ID de intención disponible
router.get('/siguiente/id', intencionController.getSiguienteId);

// Crear una nueva intención
router.post('/', intencionController.createIntencion);
// Obtener todas las intenciones
router.get('/', intencionController.getIntenciones);
// Obtener una intención por ID
router.get('/:id', intencionController.getIntencionById);
// Actualizar una intención
router.put('/:id', intencionController.updateIntencion);
// Eliminar una intención
router.delete('/:id', intencionController.deleteIntencion);

module.exports = router;
