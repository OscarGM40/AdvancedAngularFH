const { response, request } = require("express");
const Usuario = require("./../models/Usuario");

exports.getUsuarios = async (req, res) => {
  const usuarios = await Usuario.find({}, "nombre email role google");

  res.json({
    ok: true,
    usuarios,
  });
};

exports.crearUsuario = async (req = request, res = response) => {
  const { email, password, nombre } = req.body;

  try {
    const usuario = new Usuario({ email, password, nombre });

    const existeEmail = await Usuario.findOne({ email });

    if (existeEmail) {
      return res.status(400).json({
        ok: false,
        msg: "El correo ya existe",
      });
    }

    await usuario.save();
    res.json({
      ok: true,
      usuario,
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado",
    });
  }
};
