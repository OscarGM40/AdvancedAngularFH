const { request, response } = require("express");
const { validationResult } = require("express-validator");

exports.validarCampos = (req= request,res= response,next) => {
   
   const errores = validationResult(req);

   if (!errores.isEmpty()) {
      return res.status(400).json({
         ok: false,
         errores: errores.mapped(),
      });
   }  
   next();
}

