
const jwt = require('jsonwebtoken');


exports.generarJWT = (uid) => {
  return new Promise((resolve, reject) => {
    const payload = {
      uid,
    };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      },
      (err, token) => {
        if (err) {
           console.log(err);
          reject("Error al generar token: " + err);
        } else {
          resolve(token);
        }
      }
    );
  });
};
