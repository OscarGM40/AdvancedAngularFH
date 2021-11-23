const { check } = require("express-validator");
const { login } = require("../controllers/auth.controllers");
const { validarCampos } = require("../middlewares/validarCampos");

const router = require("express").Router();

router.post(
  "/",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").exists(),
    validarCampos,
  ],
  login
);

module.exports = router;
