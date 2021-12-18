const { response } = require("express");
const Hospital = require("../models/Hospital");
const Medico = require("../models/Medico");
const Usuario = require("../models/Usuario");

exports.getByPatron = async (req, res = response) => {
  const patron = req.params.patron;
  const regex = new RegExp(patron, "i");

  /* si bien puedo hacer nombre = new RegExp(patron,'i') mejor creo solo una instancia en vez de tres */
  /*   const usuarios = await Usuario.find({ nombre: regex });
  const medicos = await Medico.find({ nombre: regex });
  const hospitales = await Hospital.find({ nombre: regex }); */

  //   De nuevo no quiero tres busquedas sincronas.
  const [usuarios, medicos, hospitales] = await Promise.all([
    Usuario.find({ nombre: regex }),
    Medico.find({ nombre: regex }),
    Hospital.find({ nombre: regex }),
  ]);

  res.json({
    ok: true,
    usuarios,
    medicos,
    hospitales,
  });
};

// /api/todo/coleccion/:tabla/:patron
exports.getByCollectionAndPattern = async (req, res = response) => {
  const desde = Number(req.query.desde) || 0;

  const tabla = req.params.tabla;
  const patron = req.params.patron;
  const regex = new RegExp(patron, "i");

  let data;
  let total;
  switch (tabla) {
    case "medicos":
      data = await Medico.find({ nombre: regex })
        .populate("usuario", "nombre img")
        .populate("hospital", "nombre img")
        .skip(desde).limit(5);
      total = await Medico.countDocuments({ nombre: regex });
      break;
    case "hospitales":
      data = await Hospital.find({ nombre: regex })
        .populate("usuario", "nombre img").skip(desde).limit(5);
      total = await Hospital.countDocuments({ nombre: regex });
      break;
    case "usuarios":
      data = await Usuario.find({ nombre: regex }).skip(desde).limit(5);
      total = await Usuario.countDocuments({ nombre: regex });
      break;
    default:
      return res.status(400).json({
        ok: false,
        msg: "La tabla tiene que ser usuarios | medicos | hospitales",
      });
  }

  res.json({
    ok: true,
    resultados: data,
    total,
  });
};
