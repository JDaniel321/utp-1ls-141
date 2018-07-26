let express = require('express');
let app = express;
const path= require('path');


//conexion

mongoose.connect('mongodb://localhost/semestral')
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error en la conexion'));
db.once('open', ()=> {
    console.log ('conectado a la bd');
});

//routes
let routes = require('./Routes/routers');
app.use('/', routes);
app.use(function(req, res, next){
let error = new Error('Archivo no encontrado');
error.status= 404
next(error);
})