const { request, response } = require("express");
const Usuario = require("../models/Usuario");
const bcrypt = require("bcryptjs");
const { generarJWT } = require("../helpers/jwt");
const { googleVerify } = require("../helpers/google-verify");

exports.login = async (req = request, res = response) => {
  const { email, password } = req.body;

  const usuario = await Usuario.findOne({ email });

  if (!usuario) {
    return res.status(404).json({
      ok: false,
      msg: "Credenciales incorrectas",
    });
  }
  // verificar password
  const validPassword = bcrypt.compareSync(password, usuario.password);

  if (!validPassword) {
    return res.status(400).json({
      ok: false,
      msg: "El password no es correcto",
    });
  }

  const token = await generarJWT(usuario._id);

  res.json({
    ok: true,
    token,
  });
};

exports.googleSignIn = async (req = request, res = response) => {
  const googleToken = req.body.token;

  
  try {
     const { name, email, picture } = await googleVerify(googleToken);
     
     // un usuario podria registrarse de forma normal y despues querer acceder por Google.Debo manejar esto
     const usuarioDB = await Usuario.findOne({ email });
     let usuario;
     if (!usuarioDB) {
         // si el usuario no existe en la base de datos, lo creo
         usuario = new Usuario({
               nombre: name,
               email,
               password: '@@@', //no se usará
               img: picture,
               google: true
         });
       } else {
         // si el usuario existe, actualizo su información
         usuario = usuarioDB;
         usuario.google = true;
         // si le mantengo el campo password va a poder acceder por ambos métodos de autenticación.DEbo dejarlo
       }
         // guardar el usuario
         await usuario.save();
         // generar el token
         const token = await generarJWT(usuario.id);

    res.json({
      ok: true,
      msg: "Usuario logeado correctamente",
      name,
      email,
      picture,
      token
    });
  } catch (err) {
    return res.status(401).json({
      ok: false,
      msg: "Token no valido",
    });
  }
};

exports.renewToken = async (req = request, res = response) => {
  const uid = req.uid;

  const token = await generarJWT(uid);

  const user = await Usuario.findById(uid);

  res.json({
    ok: true,
    token,
    usuario:user,
  });
}
