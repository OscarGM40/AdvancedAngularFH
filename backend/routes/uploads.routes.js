const { check } = require("express-validator");
const { fileUpload } = require("../controllers/uploads.controllers");
const { validarToken } = require("../middlewares/validarToken");

// dado que ya tengo el controlador que se llama fileUpload,tengo que cambiar el nombre,como es importación por defecto le pongo cualquiera
const expressFileUpload = require('express-fileupload');

/* NOTA si bien los middleware se aplican con app.use(middleware) también puedo usar router.use(middleware) y se aplicará igual */
const router = require("express").Router();

router.use(expressFileUpload({
  limits: { fileSize: 50 * 1024 * 1024 },//50MB
}));


router.put('/:tipo/:id', validarToken, fileUpload)

module.exports = router;
