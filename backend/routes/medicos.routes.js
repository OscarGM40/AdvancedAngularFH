/* ruta /api/medicos */

const router = require("express").Router();

const {
  getMedicos,
  crearMedico,
  actualizarMedico,
  borrarMedico,
  getMedico,
} = require("../controllers/medicos.controller");
const { check, param } = require("express-validator");
const { validarCampos } = require("../middlewares/validarCampos");
const { validarToken } = require("../middlewares/validarToken");

/* GET ALL MEDICS  */
router.get("/", validarToken, getMedicos);

/* GET ONE MEDIC  */
router.get(
  "/:id",
  [
    validarToken,
    param("id", "Debe ser un id válido").isMongoId(),
    validarCampos,
  ],
  getMedico
);

/* CREATE-REGISTER A MEDIC */
router.post(
  "/",
  [
    validarToken,
    check("nombre", "El nombre del medico es obligatorio").not().isEmpty(),
    check("hospital", "El campo hospital es obligatorio").not().isEmpty(),
    check(
      "hospital",
      "El id del campo hospital debe ser un mongoId válido"
    ).isMongoId(),
    validarCampos,
  ],
  crearMedico
);

/* UPDATE MEDIC SETTINGS */
router.put(
  "/:id",
  [
    validarToken,
    check("nombre", "El nombre del medico es obligatorio").not().isEmpty(),
    check("hospital", "El campo hospital es obligatorio").not().isEmpty(),
    check(
      "hospital",
      "El id del campo hospital debe ser un mongoId válido"
    ).isMongoId(),
    param("id", "Debe ser un id válido").isMongoId(),
    validarCampos,
  ],
  actualizarMedico
);

/* DELETE MEDIC */
router.delete(
  "/:id",
  [
    validarToken,
    param("id", "El id del medico debe ser un mongoId válido").isMongoId(),
    validarCampos,
  ],
  borrarMedico
);

module.exports = router;
