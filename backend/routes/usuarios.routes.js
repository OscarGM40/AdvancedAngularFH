/* Ruta: '/api/usuarios */
const router = require("express").Router();
const {
  getUsuarios,
  crearUsuario,
  actualizarUsuario,
  borrarUsuario,
} = require("../controllers/usuarios.controller");
const { check,body } = require("express-validator");
const { validarCampos } = require("../middlewares/validarCampos");
const { validarToken } = require("../middlewares/validarToken");
const { validarAdminRole, validateOwnUserOrAdmin } = require("../middlewares/validateRole");


/* GET ALL USERS  */
router.get("/",validarToken, getUsuarios);

/* CREATE-REGISTER A USER */
router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password es obligatorio").not().isEmpty(),
    body("password", "El password debe tener minimo 6 caracteres").isLength({min:6}),
    validarCampos,
  ],
  crearUsuario
);

/* UPDATE OWN USER SETTINGS */
router.put(
  "/:id",
  [
    validarToken,
    validateOwnUserOrAdmin,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check("role", "El role es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  actualizarUsuario
);

/* DELETE OWN USER */
router.delete("/:id", [validarToken, validarAdminRole], borrarUsuario);

module.exports = router;
