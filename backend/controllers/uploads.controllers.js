const { request, response } = require("express");
const { v4: uuidv4 } = require("uuid");
const { actualizarImagen } = require("../helpers/actualizar-imagen");
const path = require('path')
const fs = require('fs');

exports.fileUpload = async (req = request, res = response) => {
  // recuerda params los obligatorios,query los opcionales
  // además si son params se definieron en la ruta con :params
  const tipo = req.params.tipo;
  const id = req.params.id;

  // hay que asegurarse que el tipo o colección sea válido
  const tiposValidos = ["hospitales", "medicos", "usuarios"];
  if (!tiposValidos.includes(tipo)) {
    return res.status(400).json({
      ok: false,
      msg: "No es un tipo válido",
    });
  }

  // validar que venga un file
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
      ok: false,
      msg: "No se ha seleccionado ningún archivo",
    });
  }

  /* PROCESAR LA SUBIDA DE LA IMAGEN */
  const file = req.files.imagen;

  // imagina que la imagen es wolverine.image.one.jpg(la extensión la tengo la última siempre)
  const extension = file.name.split(".").pop();

  // validar que esa extensión sea válida
  const extensionesValidas = ["png", "jpg", "gif", "jpeg"];
  if (!extensionesValidas.includes(extension)) {
    return res.status(400).json({
      ok: false,
      msg:
        "No es una extensión de imágen válida.Sólo se aceptan las siguientes extensiones: " +
        extensionesValidas.join(", "),
    });
  }
  const fileName = extension === "jpeg" ? file.name.slice(0,-5) : file.name.slice(0,-4);
  // le ponemos un nombre único:
  const nombreArchivo = `${uuidv4()}.${fileName}.${extension}`;

  //path para guardar la imagen según el tipo(se recomienda usar path.resolve u otros):
  const path = `./uploads/${tipo}/${nombreArchivo}`;
  file.mv(path, (err) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        msg: "Error al mover el archivo",
      });
    }
  });
  // aquí ya se subió la imagen,asi que actualizamos el campo imagen del usuario o hospital o médico
  await actualizarImagen(tipo, id, nombreArchivo);

  res.json({
    ok: true,
    msg: "Archivo subido satisfactoriamente",
    nombreArchivo,
  });
};

exports.retornaImagen = async (req = request, res = response) => {
  const tipo = req.params.tipo;
  const foto = req.params.foto;
  
  const pathImagen = path.join(__dirname, `../uploads/${tipo}/${foto}`);

  if(fs.existsSync(pathImagen)){
    res.sendFile(pathImagen);
  }else {
    const pathNoImage = path.join(__dirname, "../uploads/no-img.jpg");
    res.sendFile(pathNoImage);
  }
}

exports.descargaImagen = async(req, res = response) => {
  const tipo = req.params.tipo;
  const foto = req.params.foto;

  const pathImagen = path.join(__dirname, `../uploads/${tipo}/${foto}`);

  if(fs.existsSync(pathImagen)){
    res.download(pathImagen);
  } else {
    const pathNoImage = path.join(__dirname, "../uploads/no-image.jpg");
    res.download(pathNoImage);
  }
}


