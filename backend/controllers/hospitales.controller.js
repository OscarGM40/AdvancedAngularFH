const { response } = require("express");
const Hospital = require("../models/Hospital");

exports.getHospitales = async (req, res = response) => {
  
  const hospitales = await Hospital.find({}).populate('usuario', 'nombre email img');
  
  res.json({
    ok: true,
    hospitales,
  });

};

exports.crearHospital = async (req, res = response) => {
  const hospital = new Hospital(req.body);
  hospital.usuario = req.uid;

  try {
    const hospitalDb = await hospital.save();
    res.json({
      ok: true,
      hospital: hospitalDb, 
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado",
    });
  }
};

exports.actualizarHospital = async (req, res = response) => {
  res.json({
    ok: true,
    msg: "Hospital actualizado",
  });
};

exports.borrarHospital = async (req, res = response) => {
  res.json({
    ok: true,
    msg: "Hospital eliminado",
  });
};
