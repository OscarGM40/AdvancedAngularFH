/* Ruta: '/api/usuarios */
const router = require("express").Router();
const {
  getUsuarios,
  crearUsuario,
  actualizarUsuario,
  borrarUsuario,
} = require("../controllers/usuarios.controller");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validarCampos");
const { validarToken } = require("../middlewares/validarToken");


/* GET ALL USERS  */
router.get("/",validarToken, getUsuarios);

/* CREATE-REGISTER A USER */
router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  crearUsuario
);

/* UPDATE OWN USER SETTINGS */
router.put(
  "/:id",
  [
    validarToken,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check("role", "El role es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  actualizarUsuario
);

/* DELETE OWN USER */
router.delete("/:id", validarToken, borrarUsuario);

module.exports = router;
