const { check } = require("express-validator");
const { login, googleSignIn, renewToken } = require("../controllers/auth.controllers");
const { validarCampos } = require("../middlewares/validarCampos");
const { validarToken } = require("../middlewares/validarToken");

const router = require("express").Router();

router.post(
  "/",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").not().isEmpty(),
    validarCampos,
  ],
  login
);

router.post(
  "/google",
  [
    check("token", "Token is required").not().isEmpty(),
  validarCampos
],
  googleSignIn
);

router.get("/renew",[
  validarToken,
  validarCampos
],
renewToken);

module.exports = router;
