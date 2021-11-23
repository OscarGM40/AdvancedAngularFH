const { request, response } = require("express");
const Usuario = require("../models/Usuario");
const bcrypt = require("bcryptjs");
const { generarJWT } = require("../helpers/jwt");

exports.login = async (req = request, res = response) => {
   const { email, password } = req.body;

   const usuario = await Usuario.findOne({ email });

   if (!usuario) {
      return res.status(404).json({ 
         ok:false,
         msg: 'Credenciales incorrectas' });
   }
   // verificar password
   const validPassword = bcrypt.compareSync(password, usuario.password);

   if (!validPassword) {
      return res.status(400).json({ 
         ok:false,
         msg: 'El password no es correcto' 
      });
   }
   
   const token = await generarJWT(usuario._id);

   res.json({ 
      ok:true,
      token });
   }; 


