/* Ruta: '/api/usuarios */
const router = require('express').Router();
const { getUsuarios, crearUsuario } = require('../controllers/usuarios.controller');



/*  */
router.get('/',getUsuarios);

/*  */
router.post('/',crearUsuario);


module.exports = router;