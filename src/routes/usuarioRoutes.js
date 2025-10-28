const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

// Rutas para usuarios
router.post('/', usuarioController.crearUsuario);
// Ruta para obtener usuarios con paginación
router.get('/', usuarioController.obtenerUsuarios);
router.delete('/:id', usuarioController.eliminarUsuario);
router.put('/:id', usuarioController.actualizarUsuario);

module.exports = router;