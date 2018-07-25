"use strict";
let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let session = require('express-session'); 
let path = require('path');
let MongoStore = require('connect-mongo')(session);

//Mongoose Connection 
let mongoose = require('mongoose');
mongoose.connect('mongodb://Jorge:123@localhost/proyectos?authDatabase=proyectos');
let db = mongoose.connection;

db.on('error',console.error.bind(console,'Error de Conexion: '));
db.once('open',() => {
	console.log('Connected to Mongo Database');
});

// Setting View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Middleware
app.use(express.static(path.join(__dirname, 'bower_components')))
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
	secret: 'work hard',
	resave: true,
	saveUninitialized: false,
	store: new MongoStore({
		mongooseConnection: db
	})
  }));

// Routes
let routes = require('./routes/router1');
app.use('/',routes);
app.use(function(req,res,next){
	let err = new Error('Archivo no encontrado');
	err.status=404;
	next(err);
});

// Open listening port
// Set PORT:
// NODE_JS_PORT=3000
const port = 3000;
app.listen(port, function(){ console.log(`Escuchando en el puerto ${port}...`) });

/*let express = require ('express');
let app = express();
const path= require('path');
let mongoose = require('mongoose');

//setting view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//middleware
app.use(express.static(path.join(__dirname, 'bower_components')));
app.use(express.static(path.join(__dirname, 'public')));

/*mongoose.connect('mongodb://localhost/semestral')
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error en la conexion'));
db.once('open', ()=> {
    console.log ('conectado a la bd');
});

let routes = require('./Routes/routers');
app.use('/', routes);
app.use(function(req, res, next){
let error = new Error('Archivo no encontrado');
error.status= 404
next(error);
})
//routes

app.get('/pagPrincipal', function(req, res){
    res.render('pagPrincipal');
});

app.get('/sesion', function(req, res){
    res.render('crearCuenta');
});

//Open Listening port
NODE_JS_PORT=3000
const port = process.env.Node_JS_Port || 3000;
app.listen(port, function(){ 
    console.log(`Escuchando en el puerto ${port}...`)
 });*/