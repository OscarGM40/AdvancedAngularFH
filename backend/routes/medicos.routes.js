/* ruta /api/medicos */

const router = require("express").Router();

const {
  getMedicos,
  crearMedico,
  actualizarMedico,
  borrarMedico,
} = require("../controllers/medicos.controller");
const { check,param } = require("express-validator");
const { validarCampos } = require("../middlewares/validarCampos");
const { validarToken } = require("../middlewares/validarToken");

/* GET ALL HOSPITALS  */
router.get("/",  getMedicos);

/* CREATE-REGISTER A HOSPITAL */
router.post("/", 
[  validarToken,
   check("nombre", "El nombre del medico es obligatorio").not().isEmpty(),
   check("hospital", "El campo hospital es obligatorio").not().isEmpty(),
   check("hospital", "El id del campo hospital debe ser un mongoId válido").isMongoId(),
   validarCampos
], crearMedico);

/* UPDATE HOSPITAL SETTINGS */
router.put("/:id", [
  validarToken,
  check("nombre", "El nombre del medico es obligatorio").not().isEmpty(),
  check("hospital", "El campo hospital es obligatorio").not().isEmpty(),
  check("hospital", "El id del campo hospital debe ser un mongoId válido").isMongoId(),
  param("id","Debe ser un id válido").isMongoId(),
  validarCampos
], actualizarMedico);

/* DELETE HOSPITAL */
router.delete("/:id",[
  validarToken,
  param("id", "El id del medico debe ser un mongoId válido").isMongoId(),
  validarCampos
], borrarMedico );

module.exports = router;
