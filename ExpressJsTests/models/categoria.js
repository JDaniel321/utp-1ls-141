"use strict";
const mongoose = require('mongoose');

 var categoriaSchema = new mongoose.Schema({
      
    codigo: { type: String, unique: true, required: false, trim: true },
    nombre: { type: String, unique: false, required: false, trim: true },

},{collection:'categoria'});

categoriaSchema.statics.findAll = function(callback){
    categoria.find({},function(err,categoria) {
        if(err)
            return callback(err);
        else if(!categoria)
            return callback();
        return callback(null,categoria);
    })
}

categoriaSchema.statics.insert = function(nombre, codigo,callback){
    categoria.findOne({codigo:codigo},'codigo',function(err,user){
        if(err){
            return callback(err)
        }
        else if(user){
            return callback(user);
        }
        else{
            var data={
                nombre:nombre,
                codigo: codigo
            };
            categoria.create(data,function(err){
                if(err)
                    return callback(err);
                return callback();
            })}
    })   
}
categoriaSchema.statics.update = function(nombre, codigo,callback){
    categoria.findOne({codigo:codigo},'nombre codigo',function(err,user){
        if(err)
            return callback(err);
        else if(!user){
            console.log(user);
            return callback();
        }
        else{
                if(nombre)
                    user.nombre = nombre;
                if(codigo)
                    user.codigo= codigo
                user.save(function(err){
                    if(err)
                        return callback(err);
                    return callback(null,true);
                });
            }
    })   
}

categoriaSchema.statics.delete = function(codigo,callback){
    categoria.findOne({codigo:codigo},'codigo',function(err,users){
        if(err)
            return callback(err);
        else if(!users)
            return callback(null,'categoria no existe');
        categoria.deleteOne({codigo:codigo}, function(err){
                if(err)
                    return callback(err);
                return callback();//Success
            });
    })   
}

let categoria = mongoose.model('categoria',categoriaSchema);

module.exports = categoria;