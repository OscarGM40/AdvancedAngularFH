const Usuario = require("../models/Usuario");
const Medico = require("../models/Medico");
const Hospital = require("../models/Hospital");
const fs = require("fs");

const borrarImagen = (path) => {
  if (fs.existsSync(path)) {
    fs.unlinkSync(path);
  }
};

exports.actualizarImagen = async (tipo, id, nombreArchivo) => {
  switch (tipo) {
    case "medicos": {
      const medico = await Medico.findById(id);
      if (!medico) {
        console.log("No existe un medico con ese id");
        return false;
      }
      const pathViejo = `./uploads/medicos/${medico.img}`;
      borrarImagen(pathViejo);
      medico.img = nombreArchivo;
      await medico.save();
      return true;
    }

    case "hospitales": {
      const hospital = await Hospital.findById(id);
      if (!hospital) {
        console.log("No existe un hospital con ese id");
        return false;
      }
      const pathViejo = `./uploads/hospitales/${hospital.img}`;
      borrarImagen(pathViejo);
      hospital.img = nombreArchivo;
      await hospital.save();
      return true;
    }

    case "usuarios": {
      const usuario = await Usuario.findById(id);
      if (!usuario) {
        console.log("No existe un usuario con ese id");
        return false;
      }
      const pathViejo = `./uploads/usuarios/${usuario.img}`;
      borrarImagen(pathViejo);
      usuario.img = nombreArchivo;
      await usuario.save();
      return true;
    }

    default:
      return false;
  }
};
