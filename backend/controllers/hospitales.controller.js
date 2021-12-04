const { response } = require("express");
const Hospital = require("../models/Hospital");
const Medico = require("../models/Medico");
const mongoose = require("mongoose");

exports.getHospitales = async (req, res = response) => {
  const hospitales = await Hospital.find({}).populate(
    "usuario",
    "nombre email img"
  );

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
  const uid = req.params.id;

  try {
    const hospital = await Hospital.findById(uid);

    if (!hospital) {
      return res.status(404).json({
        ok: false,
        msg: "Hospital no encontrado",
      });
    }

    const cambiosHospital = {
      ...req.body,
      usuario: req.uid,
    };

    const hospitalActualizado = await Hospital.findByIdAndUpdate(
      uid,
      cambiosHospital,
      { new: true }
    );

    res.json({
      ok: true,
      hospital: hospitalActualizado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado",
    });
  }
};

exports.borrarHospital = async (req, res = response) => {
  const uid = req.params.id;

  try {
    const hospital = await Hospital.findById(uid);

    if (!hospital) {
      return res.status(404).json({
        ok: false,
        msg: "Hospital no encontrado",
      });
    }

    /* Transaccion para asegurarnos que se hacen ambas o ninguna */
    const SESSION = await mongoose.startSession();
    try {
      SESSION.startTransaction();
      await Medico.updateMany({ hospital: uid }, { $set: { hospital: null } });
      await Hospital.findByIdAndDelete(uid);
      await SESSION.commitTransaction();
      res.json({
        ok: true,
        msg: "Hospital eliminado",
      });
    } catch (error) {
      await SESSION.abortTransaction();
      console.log(error);
      res.status(500).json({
        ok: false,
        msg: "Error inesperado",
      });
    } finally {
      SESSION.endSession();
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado",
    });
  }
};
