"use strict";
let express = require('express');
let router = express.Router();
let user = require('../models/user');
let users = require('../models/user')

//LOGIN
router.get('/', function(req, res){
	res.render('mantenimiento');
});

router.post('/', function(req, res, next){
	user.authenticate(req.body.email, req.body.password, function(error,user){
		if(error)
			next(error);
		else if(!user) {
			var err = new Error('Usuario o contraseña incorrecta');
            err.status = 401;
			next(err); }
		else{
			req.session.username = user.username;
			res.redirect('/productos');  }
	});
});

router.get('/productos',function(req, res, next){
	res.render('productos');
	if(!req.session.username){
		console.log("estoy aquiii");
		res.redirect('/');
	}
	users.findAll(function(error,users){
		if(error)
			next(error);
		else if(!users)
			users = [];
		else
			res.render('productos',{usuario:req.session.username, modelo:users});
	}); 
});

//INSERTAR
router.post('/', function(req, res, next){
	users.insert(req.body.nombre,req.body.apellido,req.body.edad,req.body.direccion,req.body.correo, function(error,user){
		if(error)
			next(error);
		else if(users){
			var err = new Error('correo ya existente');
			err.status = 401;
			next(err);}
		else
			res.redirect('/productos');
	  });
});

//ACTUALIZAR
router.post('/actualizar', function(req, res, next){
	users.update(req.body.nombre,req.body.apellido,req.body.edad,req.body.direccion,req.body.correo, function(error,msg){
		console.log(req.body.correo);
		if(error)
			next(error);
		else if(!msg){
			var err = new Error('Usuario no existe');
			err.status = 401;
			next (err);}
		res.redirect('/productos');
		
	  });
});

//ELIMINAR
router.post('/eliminar', function(req, res, next){
	users.delete(req.body.correo, function(error,msg){
		if(error)
			next(error);
		else if(msg){
			var err = new Error('correo no existe');
			err.status = 401;
			next(err);
		}
		else{
			console.log('exito');
			res.redirect('/productos');}
	  });
});

module.exports = router;