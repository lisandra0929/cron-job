/**
 * Rutas para la gestión de usuarios administradores.
 *
 * Rutas:
 * - `POST /registrar`: Registra un nuevo usuario (validación de datos y unicidad).
 * - `POST /iniciar-sesion`: Autentica a un usuario y devuelve un token JWT.
 * - `GET /perfil`: Devuelve la información del usuario autenticado (requiere token).
 */

const express = require('express');
const { registrar, iniciarSesion, obtenerUsuario } = require('../controllers/logController');
const { verificarToken } = require('../middlewares/authMiddleware');
const { validarRegistro, validarInicioSesion, validarNombreUnico } = require('../middlewares/validationMiddleware');

const router = express.Router();

router.post('/registrar', validarRegistro, validarNombreUnico, registrar); // Middleware de validación para registro
router.post('/iniciar-sesion', validarInicioSesion, iniciarSesion); // Middleware de validación para inicio de sesión
router.get('/perfil', verificarToken, obtenerUsuario); // Middleware de autenticación para obtener perfil

module.exports = router;