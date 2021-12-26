const { response, request } = require("express");
const Medico = require("../models/Medico");

exports.getMedicos = async (req, res = response) => {
  try {
    const medicos = await Medico.find()
      .populate("usuario", "nombre email img")
      .populate("hospital", "nombre img");

    res.json({
      ok: true,
      medicos,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error inesperado en el servidor",
    });
  }
};

exports.getMedico = async (req, res = response) => {
  try {
    const medico = await Medico.findById(req.params.id)
      .populate("usuario", "nombre email img")
      .populate("hospital", "nombre img");

    res.json({
      ok: true,
      medico,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error inesperado en el servidor",
    });
  }
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

exports.actualizarMedico = async (req = request, res = response) => {
  const uid = req.params.id;

  try {
    const medicoDb = await Medico.findById(uid);
    if (!medicoDb) {
      return res.status(404).json({
        ok: false,
        msg: "Medico no encontrado",
      });
    }
    const cambiosMedico = {
      ...req.body,
      usuario: req.uid,
    };
    const medicoActualizado = await Medico.findByIdAndUpdate(
      uid,
      cambiosMedico,
      { new: true }
    );
    res.json({
      ok: true,
      medico: medicoActualizado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado.Hable con el administrador",
    });
  }
};

exports.borrarMedico = async (req = request, res = response) => {
  const uid = req.params.id;

  try {
    const medicoDb = await Medico.findById(uid);
    if (!medicoDb) {
      return res.status(404).json({
        ok: false,
        msg: "Medico no encontrado",
      });
    }
    await Medico.findByIdAndDelete(uid);

    res.json({
      ok: true,
      msg: "Medico eliminado",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado.Hable con el administrador",
    });
  }
};
