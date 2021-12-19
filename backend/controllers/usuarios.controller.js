const { response, request } = require("express");
const Usuario = require("./../models/Usuario");
const bcrypt = require("bcryptjs");
const { generarJWT } = require("../helpers/jwt");

exports.getUsuarios = async (req, res) => {
  // ojo que si hago el Number(undefined) necesito || 0
  const desde = Number(req.query.desde) || 0;
  // console.log(desde);

  // Realmente no quiero ejecutar estas dos tareas una detrás de otra y sumar sus tiempos porque puedo lanzarlas a la vez con Promise.all

  /*   const usuarios = await Usuario
    .find({}, "nombre email role google isActive")
    .skip(desde)
    .limit(5);
  const total = await Usuario.countDocuments(); */

  // Fijate que Promise.all va a respetar el orden de cada promesa asi que puedo usar desestructuración de arreglos y asignar posicionalmente el nombre que quiero.Además recuerda que Promise.all también es una promesa(tengo que usar async o then).
  const [usuarios, total] = await Promise.all([
    Usuario.find({isActive:true}, "nombre email role google isActive img")
      .skip(desde)
      .limit(5),
    Usuario.countDocuments({isActive:true}), //este va a ser [1]
  ]);

  res.json({
    ok: true,
    usuarios,
    total,
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

    const token = await generarJWT(usuario._id);

    res.json({
      ok: true,
      usuario,
      token,
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

      if (!existeEmail) {
        if (usuarioDB.google === false) {
          usuarioDB.email = email;
        } else {
          return res.status(400).json({
            ok: false,
            msg: "No puedes cambiar el correo de un usuario de google",
          });
        }
      } else {
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

    if (!usuarioDB.isActive) {
      return res.status(400).json({
        ok: false,
        msg: "El usuario ya está desactivado",
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
};
