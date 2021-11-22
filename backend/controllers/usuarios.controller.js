const { response, request } = require("express");
const { validationResult } = require("express-validator");
const Usuario = require("./../models/Usuario");
const bcrypt = require("bcryptjs");

exports.getUsuarios = async (req, res) => {
  const usuarios = await Usuario.find({}, "nombre email role google isActive");

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

    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

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

exports.actualizarUsuario = async (req = request, res = response) => {
  // TODO validar token
  const uid = req.params.id;
  const { nombre, email, password, role } = req.body;

  try {
    const usuarioDB = await Usuario.findById(uid);

    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: "Usuario no encontrado",
      });
    }

    
    usuarioDB.nombre = nombre;
    if (usuarioDB.email !== email) {
      const existeEmail = await Usuario.findOne({ email });
      
      if(!existeEmail) {
        usuarioDB.email = email;
      }else{
        return res.status(400).json({
          ok: false,
          msg: "El correo ya existe",
        });
      }

    }
    usuarioDB.role = role;

    if (password) {
      const salt = bcrypt.genSaltSync();
      usuarioDB.password = bcrypt.hashSync(password, salt);
    }

    await usuarioDB.save();

    res.json({
      ok: true,
      usuario: usuarioDB,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado",
    });
  }
};

exports.borrarUsuario = async (req = request, res = response) => {
  const uid = req.params.id;

  try {
    const usuarioDB = await Usuario.findById(uid);

    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: "Usuario no encontrado",
      });
    }

    usuarioDB.isActive = false;
    await usuarioDB.save();

    res.json({
      ok: true,
      msg: "Usuario eliminado/desactivado",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado",
    });
  }
}
