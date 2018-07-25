"use strict";
let express = require('express');
let router = express.Router();
let user = require('../models/user');
let usuario = require('../models/usuario');
let products = require('../models/products');

//LOGIN
router.get('/', function(req, res){
	res.render('index');
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
			res.redirect('/profile');  }
	});
});

router.get('/profile',function(req, res, next){
	if(!req.session.username){
		res.redirect('/');
	}
	usuario.findAll(function(error,users){
		if(error)
			next(error);
		else if(!users)
			users = [];
		else
			res.render('profile',{usuario:req.session.username, modelo:users});
	}); 
});



router.get('/productos',function(req, res, next){
	if(!req.session.username){
		res.redirect('/');
	}
	usuario.findAll(function(error,users){
		if(error)
			next(error);
		else if(!users)
			users = [];
		else
			res.render('productos',{usuario:req.session.username, modelo:users});
	}); 
});


//INSERTAR
router.post('/insertar', function(req, res, next){
	usuario.insert(req.body.nombre,req.body.apellido,req.body.edad,req.body.correo,req.body.direccion, function(error,user){
		if(error)
			next(error);
		else if(user){
			var err = new Error('correo ya existente');
			err.status = 401;
			next(err);}
		else
			res.redirect('/profile');
	  });
});

//InsertarProductos

router.post('/insertarP', function(req, res, next){
	products.insert(req.body.nombre,req.body.descripcion,req.body.precio,req.body.cantidad, function(error,user){
		if(error)
			next(error);
		/*else if(user){
			var err = new Error('Producto ya existente');
			err.status = 401;
			next(err);}*/
		else
			res.redirect('/productos');
	  });
});

//ACTUALIZAR
router.post('/actualizar', function(req, res, next){
	usuario.update(req.body.nombre,req.body.apellido,req.body.edad,req.body.correo,req.body.direcion, function(error,msg){
		console.log(req.body.correo);
		if(error)
			next(error);
		else if(!msg){
			var err = new Error('Usuario no existe');
			err.status = 401;
			next (err);}
		res.redirect('/profile');
		
	  });
});

//Actualizar Productos
router.post('/actualizarP', function(req, res, next){
	usuario.update(req.body.nombre,req.body.descripcion,req.body.precio,req.body.cantidad, function(error,msg){
		console.log(req.body.nombre);
		if(error)
			next(error);
		else if(!msg){
			var err = new Error('Producto no existe');
			err.status = 401;
			next (err);}
		res.redirect('/productos');
		
	  });
});


//ELIMINAR
router.post('/eliminar', function(req, res, next){
	usuario.delete(req.body.correo, function(error,msg){
		if(error)
			next(error);
		else if(msg){
			var err = new Error('correo no existe');
			err.status = 401;
			next(err);
		}
		else{
			console.log('exito');
			res.redirect('/profile');}
	  });
});

//ELIMINAR Productos
router.post('/eliminarP', function(req, res, next){
	products.delete(req.body.nombre, function(error,msg){
		if(error)
			next(error);
		else if(msg){
			var err = new Error('producto no existe');
			err.status = 401;
			next(err);
		}
		else{
			console.log('exito');
			res.redirect('/productos');}
	  });
});

router.get("/productos", function(req, res, next){	
	res.render("productos");
});

module.exports = router;