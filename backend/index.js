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

app.get('/', (req, res) => {
    res.json({msg:'Hello World!',ok:true});
});





const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.clear();
    console.log('listening on port ' + port);
});