/* ruta /api/hospitales */

const router = require("express").Router();

const {
  getHospitales,
  crearHospital,
  actualizarHospital,
  borrarHospital,
} = require("../controllers/hospitales.controller");

const { check,param,header } = require("express-validator");
const { validarCampos } = require("../middlewares/validarCampos");
const { validarToken } = require("../middlewares/validarToken");

/* GET ALL HOSPITALS  */
router.get("/", getHospitales);

/* CREATE AN HOSPITAL */
router.post("/",
  [
    validarToken,
    check("nombre", "El nombre del hospital es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  crearHospital
);

/* UPDATE HOSPITAL SETTINGS */
router.put("/:id", [
  validarToken,
  check("nombre", "El nombre del hospital es obligatorio").not().isEmpty(),
  param("id","Debe ser un id válido").isMongoId(),
  validarCampos,
], actualizarHospital);

/* DELETE HOSPITAL */
router.delete("/:id",[
  validarToken,
  param("id","Debe ser un id válido").isMongoId(),
  header("x-token", "Debe enviar un token en el header").not().isEmpty(),
  validarCampos,
], borrarHospital);

module.exports = router;
