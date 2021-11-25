const { response } = require("express");
const Medico = require("../models/Medico");

exports.getMedicos = async (req, res = response) => {

  const medicos = await Medico.find().populate('usuario', 'nombre email img').populate('hospital','nombre img');
  
  res.json({
    ok: true,
    medicos
  });
};

exports.crearMedico = async (req, res = response) => {
   const medico = new Medico(req.body);
   medico.usuario = req.uid;

   try {
     const medicoDb = await medico.save();
     res.json({
       ok: true,
       medico: medicoDb,
     });
   } catch (error) {
     console.log(error);
     res.status(500).json({
       ok: false,
       msg: "Error inesperado.Hable con el administrador",
     });
   }
};

exports.actualizarMedico = async (req, res = response) => {
  res.json({
    ok: true,
    msg: "Medico actualizado",
  });
};

exports.borrarMedico = async (req, res = response) => {
  res.json({
    ok: true,
    msg: "Medico eliminado",
  });
};
