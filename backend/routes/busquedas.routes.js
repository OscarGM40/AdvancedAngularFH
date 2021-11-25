/* ruta api/todo/:busqueda */
const router = require("express").Router();

const { getByPatron, getByCollectionAndPattern } = require("../controllers/busquedas.controller");
const { validarToken } = require("../middlewares/validarToken");


router.get("/:patron", validarToken, getByPatron);
router.get("/coleccion/:tabla/:patron", validarToken, getByCollectionAndPattern);

module.exports = router;