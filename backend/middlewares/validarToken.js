const { response, request } = require("express");
const jwt = require("jsonwebtoken");

exports.validarToken = (req = request, res = response, next) => {
  // fijate que tengo en req.headers todos los headers y en req.header(headerName) el header que tenga ese nombre
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      ok: false,
      mensaje: "No hay token",
    });
  }
  
   jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
     if (err) {
        return res.status(401).json({
           ok: false,
           mensaje: 'Token no válido',
         });
      }
      // en decoded tendré el object { uid: '123',iat,exp }
      req.uid = decoded.uid;
      next();
   }); 
};
