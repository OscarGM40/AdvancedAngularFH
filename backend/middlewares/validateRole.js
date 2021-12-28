const { request, response } = require("express");
const Usuario = require("../models/Usuario");

exports.validarAdminRole = async (req= request, res = response, next)=> {
  const uid = req.uid;
  try {
    const usuario = await Usuario.findById(uid);  
    
    if(!usuario) {
      return res.status(401).json({
        ok: false,
        mensaje: "El usuario no existe",
      });
    }

    if (usuario.role !== 'ADMIN_ROLE') {
      return res.status(401).json({
        ok: false,
        mensaje: 'No tiene permisos para realizar esta acción',
      });
    }
    next();  
    
  } catch (error) {
    return res.status(500).json({
      ok: false,
      mensaje: "Error inesperado",
      error,
    });
  }
}

exports.validateOwnUserOrAdmin = async (req=request, res = response, next)=> {
   const uid = req.uid;
   const id = req.params.id;

   try {
     const usuario = await Usuario.findById(uid);

     if (!usuario) {
       return res.status(401).json({
         ok: false,
         mensaje: "El usuario no existe",
       });
     }

     if (!(usuario.role === "ADMIN_ROLE" || usuario.id === id)) {
       return res.status(401).json({
         ok: false,
         mensaje: "No tiene permisos para realizar esta acción",
       });
     }

     next();
   } catch (error) {
     return res.status(500).json({
       ok: false,
       mensaje: "Error inesperado",
       error,
     });
   }
 
}