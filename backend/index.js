require('dotenv').config();
const express = require('express');
const { dbConnection } = require('./database/dbconfig');
const cors = require('cors');
const path = require('path');

// Initializations
const app = express();
dbConnection();

// middlewares de Node
app.use(express.json())
app.use(cors());
// middleware para poner una carpeta publica(podria poner alli archivos html o imagenes,videos,archivos de audio,...)Lo que ponga alli será visible para el navegador y cualquier usuario
app.use("/",express.static('public'));

// peticiones de las rutas al Router de Express
app.use('/api/usuarios',require('./routes/usuarios.routes'))
app.use('/api/hospitales',require('./routes/hospitales.routes'))
app.use('/api/medicos',require('./routes/medicos.routes'))
app.use('/api/login',require('./routes/auth.routes'))
app.use('/api/todo',require('./routes/busquedas.routes'))
app.use('/api/upload',require('./routes/uploads.routes'))

app.get('*',(req,res)=> {
    res.sendFile(path.join(__dirname,'public/index.html'));
});



const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.clear();
    console.log('listening on port ' + port);
});