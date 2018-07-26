"use strict";
let express = require('express');
let router = express.Router();
let user = require('../models/user');
let products = require('../models/products');

//LOGIN
router.get('/', function(req, res){
	res.render('prueba');
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
			res.redirect('/prueba');  }
	});
});

router.get('/prueba',function(req, res, next){
	if(!req.session.username){
		res.redirect('/');
	}
	products.findAll(function(error,users){
		if(error)
			next(error);
		else if(!users)
			users = [];
		else
			res.render('prueba',{products:req.session.username, modelo:users});
	}); 
});

//INSERTAR
router.post('/insertar', function(req, res, next){
	products.insert(req.body.nombre,req.body.descripcion,req.body.cantidad,req.body.precio,req.body.img, function(error,user){
		if(error)
			next(error);
		else if(user){
			var err = new Error('precio ya existente');
			err.status = 401;
			next(err);}
		else
			res.redirect('/prueba');
	  });
});

//ACTUALIZAR
router.post('/actualizar', function(req, res, next){
	products.update(req.body.nombre,req.body.descripcion,req.body.cantidad,req.body.precio,req.body.img, function(error,msg){
		console.log(req.body.precio);
		if(error)
			next(error);
		else if(!msg){
			var err = new Error('Usuario no existe');
			err.status = 401;
			next (err);}
		res.redirect('/prueba');
		
	  });
});

//ELIMINAR
router.post('/eliminar', function(req, res, next){
	products.delete(req.body.nombre, function(error,msg){
		if(error)
			next(error);
		else if(msg){
			var err = new Error('nombre no existe');
			err.status = 401;
			next(err);
		}
		else{
			console.log('exito');
			res.redirect('/prueba');}
	  });
});

module.exports = router;