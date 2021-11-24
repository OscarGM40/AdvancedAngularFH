/* ruta /api/hospitales */

const router = require("express").Router();

const {
  getHospitales,
  crearHospital,
  actualizarHospital,
  borrarHospital,
} = require("../controllers/hospitales.controller");

const { check } = require("express-validator");
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
router.put("/:id", [], actualizarHospital);

/* DELETE HOSPITAL */
router.delete("/:id", borrarHospital);

module.exports = router;
