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




const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.clear();
    console.log('listening on port ' + port);
});