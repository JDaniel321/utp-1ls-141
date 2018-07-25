"use strict";
const mongoose = require('mongoose');


 var usuarioSchema = new mongoose.Schema({
    nombre: { type: String, unique: false, required: false, trim: true },
    apellido: { type: String, unique: false, required: false, trim: true },
    edad: { type: Number, unique: false, required: false, trim: true },
    correo: { type: String, unique: true, required: false, trim: true },
    direccion: { type: String, unique: false, required: false, trim: true },
},{collection:'usuario'});

usuarioSchema.statics.findAll = function(callback){
    usuario.find({},function(err,users) {
        if(err)
            return callback(err);
        else if(!users)
            return callback();
        return callback(null,users);
    })
}

usuarioSchema.statics.insert = function(nombre,apellido,edad,correo,direccion,callback){
    usuario.findOne({correo:correo},'correo',function(err,user){
        if(err){
            return callback(err)
        }
        else if(user){
            return callback(user);
        }
        else{
            var data={
                nombre:nombre,
                apellido:apellido,
                edad:edad,
                correo:correo,
                direccion:direccion
            };
            usuario.create(data,function(err){
                if(err)
                    return callback(err);
                return callback();
            })}
    })   
}
usuarioSchema.statics.update = function(nombre,apellido,edad,correo,direccion,callback){
    usuario.findOne({correo:correo},'nombre apellido edad direccion',function(err,user){
        console.log(user);
        if(err)
            return callback(err);
        else if(!user){
            console.log(user);
            return callback();
        }
        else{
                if(nombre)
                    user.nombre = nombre;
                if(apellido)
                    user.apellido=apellido;
                if(edad)
                    user.edad = edad;               
                if(direccion)
                    user.direccion = direccion;
                user.save(function(err){
                    if(err)
                        return callback(err);
                    return callback(null,true);
                });
            }
    })   
}

usuarioSchema.statics.delete = function(correo,callback){
    usuario.findOne({correo:correo},'correo',function(err,users){
        if(err)
            return callback(err);
        else if(!users)
            return callback(null,'correo no existe');
        usuario.deleteOne({correo:correo}, function(err){
                if(err)
                    return callback(err);
                return callback();//Success
            });
    })   
}

let usuario = mongoose.model('usuario',usuarioSchema);
module.exports = usuario;