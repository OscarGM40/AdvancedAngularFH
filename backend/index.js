require('dotenv').config();
const express = require('express');
const { dbConnection } = require('./database/dbconfig');
const cors = require('cors');

// Initializations
const app = express();
dbConnection();

// middlewares de Node
app.use(express.json())
app.use(cors());

// peticiones de las rutas al Router de Express
app.use('/api/usuarios',require('./routes/usuarios.routes'))
app.use('/api/hospitales',require('./routes/hospitales.routes'))
app.use('/api/medicos',require('./routes/medicos.routes'))
app.use('/api/login',require('./routes/auth.routes'))




const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.clear();
    console.log('listening on port ' + port);
});