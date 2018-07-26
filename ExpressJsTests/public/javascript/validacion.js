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
			res.redirect('home'); }
	});
});