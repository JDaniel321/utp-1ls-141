"use strict";
const mongoose = require('mongoose');

 var productosSchema = new mongoose.Schema({
    nombre: { type: String, unique: false, required: false, trim: true },
    descripcion: { type: String, unique: false, required: false, trim: true },
    cantidad: { type: Number, unique: false, required: false, trim: true },
    precio: { type: Number, unique: true, required: false, trim: true },

},{collection:'productos'});


productosSchema.statics.findAll = function(callback){
    productos.find({},function(err,users) {
        if(err)
            return callback(err);
        else if(!users)
            return callback();
        return callback(null,users);
    })
}

productosSchema.statics.insert = function(nombre,descripcion,precio,cantidad,callback){
    productos.findOne({nombre:nombre},'nombre',function(err,user){
        if(err){
            return callback(err)
        }
        else if(user){
            return callback(user);
        }
        else{
            var data={
                nombre:nombre,
                descripcion:descripcion,
                precio:precio,
                cantidad:cantidad
            };
            productos.create(data,function(err){
                if(err)
                    return callback(err);
                return callback();
            })}
    })   
}
productosSchema.statics.update = function(nombre,descripcion,precio,cantidad,callback){
    productos.findOne({nombre:nombre},'nombre descripcion precio cantidad',function(err,user){
        if(err)
            return callback(err);
        else if(!user){
            console.log(user);
            return callback();
        }
        else{
                if(nombre)
                    user.nombre = nombre;
                if(descripcion)
                    user.descripcion=descripcion;
                if(precio)
                    user.precio = precio;               
                if(cantidad)
                    user.cantidad = cantidad;
                user.save(function(err){
                    if(err)
                        return callback(err);
                    return callback(null,true);
                });
            }
    })   
}

productosSchema.statics.delete = function(nombre,callback){
    productos.findOne({nombre:nombre},'nombre',function(err,users){
        if(err)
            return callback(err);
        else if(!users)
            return callback(null,'nombre no existe');
        productos.deleteOne({nombre:nombre}, function(err){
                if(err)
                    return callback(err);
                return callback();//Success
            });
    })   
}

let productos = mongoose.model('productos',productosSchema);

module.exports = productos;
