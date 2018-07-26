"use strict";
let express = require('express');
let router = express.Router();
let usuario = require('../models/usuario');
let products = require('../models/products');
let user = require("../models/user");
let categoria = require("../models/categoria");


//LOGIN
router.get('/', function(req, res){
	res.render('inicio');
});

router.get('/login',function(req, res){
	res.render('login');
	
});


router.post('/login', function(req, res, next){
	usuario.authenticate(req.body.correo, req.body.password, function(error,user){	
		if(error)
			next(error);
		if(!user) {
			var err = new Error('Usuario o contraseña incorrecta');
            err.status = 401;
			next(err); }
		else{
			req.session.correo = usuario.correo;
			req.session.password = usuario.password;
			res.redirect('/home'); }
	});
});

router.get('/home',function(req, res){
	res.render('home');
	
});

router.get('/cerrarsesion',function(req, res){
	res.render('cerrarsesion');
	
});

/*
router.post('/login',function(req,res){  
    sess=req.session;     
    sess.correo=req.body.correo;  
    res.redirect('/home');  
});*/


router.get('/logout',function(req,res){    
    req.session.destroy(function(err){  
        if(err){  
            console.log(err);  
        }  
        else  
        {  
			res.redirect('/cerrarsesion');
			console.log("haz cerrado sesion");
			
        }  
    });  

});




//INSERTAR
router.post('/insertar', function(req, res, next){
	usuario.insert(req.body.nombre,req.body.apellido,req.body.edad,req.body.correo,req.body.password, function(error, usuario){
		if(error)
			next(error);
		else if(usuario){
			var err = new Error('correo ya existente');
			err.status = 401;
			next(err);}
		else
			res.redirect('home');
	  });
});


router.get('/proceso_compra',function(req, res){
	res.render('proceso_compra');
	
});

router.get('/mochilas',function(req, res,next){
	products.findM(function(err, products){
		if(err){
			next(err);
		}
		else if (!products){
			products = [];
		}
		else{
			console.log(products);
			res.render('mochilas',{products: req.session.usuario, modelo: products})
		}
	});	
});

router.get('/cuadernos',function(req, res, next){
	products.findL(function(err, products){
		if(err){
			next(err);
		}
		else if (!products){
			products = [];
		}
		else{
			console.log(products);
			res.render('cuadernos',{products: req.session.usuario, modelo: products})
		}
	});	
});

router.get('/arte',function(req, res){
	products.findA(function(err, products){
		if(err){
			next(err);
		}
		else if (!products){
			products = [];
		}
		else{
			console.log(products);
			res.render('arte',{products: req.session.usuario, modelo: products})
		}
	});
	
});

router.get('/escritura',function(req, res){
	products.findE(function(err, products){
		if(err){
			next(err);
		}
		else if (!products){
			products = [];
		}
		else{
			console.log(products);
			res.render('escritura',{products: req.session.usuario, modelo: products})
		}
	});
	
});

router.get('/pago',function(req, res){
	res.render('pago');
	
});

router.get('/paypal',function(req, res){
	res.render('paypal');
	
});

//Mantenimientos
router.get("/administrador", function(req, res){
	res.render("administrador");
});

router.post('/administrador', function(req, res, next){
	user.authenticate(req.body.email, req.body.password, function(error,user){
		if(error)
			next(error);
		else if(!user) {
			var err = new Error('Usuario o contraseña incorrecta');
            err.status = 401;
			next(err); }
		else{
			req.session.username = user.username;
			res.redirect('/menu');  }
	});
});

router.get("/faq", function(req, res){
	res.render("faq");
});

router.get("/menu", function(req, res){
	res.render("menu");
});

//Productos


router.get('/productos',function(req, res, next){
	if(!req.session.username){
		res.redirect('/');
	}
	products.findAll(function(error,products){
		if(error)
			next(error);
		else if(!products)
			products = [];
		else
			console.log(products);
			res.render('productos',{user : req.session.username, modelos: products});
	}); 
});


router.post('/insertarP', function(req, res, next){
	products.insert(req.body.nombre,req.body.descripcion,req.body.precio,req.body.cantidad, req.body.imagen, req.body.codigo, function(error,user){
		if(error)
			next(error);
		else if(user){
			var err = new Error('Producto ya existente');
			err.status = 401;
			next(err);}
		else
			res.redirect('/productos');
	  });
});

router.post('/actualizarP', function(req, res, next){
	products.update(req.body.nombre,req.body.descripcion,req.body.precio,req.body.cantidad, req.body.imagen, req.body.codigo, function(error,msg){
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

//Usuarios
router.get('/usuario',function(req, res, next){
	if(!req.session.username){
		res.redirect('/');
	}
	usuario.findAll(function(error,usuario){
		if(error)
			next(error);
		else if(!usuario)
			usuario = [];
		else
			console.log(usuario);
			res.render('usuario',{user: req.session.username, modelo: usuario});
	}); 
});

router.post('/insertarU', function(req, res, next){
	usuario.insert(req.body.nombre,req.body.apellido,req.body.edad,req.body.correo, req.body.password, function(error,user){
		if(error)
			next(error);
		else if(user){
			var err = new Error('usuario ya existente');
			err.status = 401;
			next(err);}
		else
			res.redirect('/usuario');
	  });
});

router.post('/actualizarU', function(req, res, next){
	usuario.update(req.body.nombre,req.body.apellido,req.body.edad,req.body.correo, function(error,msg){
		console.log(req.body.correo);
		if(error)
			next(error);
		else if(!msg){
			var err = new Error('usuario no existe');
			err.status = 401;
			next (err);}
		res.redirect('/usuario');
		
	  });
});

router.post('/eliminarU', function(req, res, next){
	usuario.delete(req.body.correo, function(error,msg){
		if(error)
			next(error);
		else if(msg){
			var err = new Error('usuario no existe');
			err.status = 401;
			next(err);
		}
		else{
			console.log('exito');
			res.redirect('/usuario');}
	  });
});

//Categorias

router.get('/categoria',function(req, res, next){
	if(!req.session.username){
		res.redirect('/');
	}
	categoria.findAll(function(error,categoria){
		if(error)
			next(error);
		else if(!categoria)
			categoria = [];
		else
			console.log(categoria);
			res.render('categoria',{user: req.session.username, modelo: categoria});
	}); 
});

router.post('/insertarC', function(req, res, next){
	categoria.insert(req.body.nombre, req.body.codigo, function(error,user){
		if(error)
			next(error);
		else if(user){
			var err = new Error('categoria ya existente');
			err.status = 401;
			next(err);}
		else
			res.redirect('/categoria');
	  });
});

router.post('/actualizarC', function(req, res, next){
	categoria.update(req.body.nombre,req.body.codigo, function(error,msg){
		console.log(req.body.codigo);
		if(error)
			next(error);
		else if(!msg){
			var err = new Error('categoria no existe');
			err.status = 401;
			next (err);}
		res.redirect('/categoria');
		
	  });
});

router.post('/eliminarC', function(req, res, next){
	categoria.delete(req.body.codigo, function(error,msg){
		if(error)
			next(error);
		else if(msg){
			var err = new Error('categoria no existe');
			err.status = 401;
			next(err);
		}
		else{
			console.log('exito');
			res.redirect('/categoria');}
	  });
});

module.exports = router;