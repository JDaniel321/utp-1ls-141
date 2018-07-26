"use strict";
const mongoose = require('mongoose');

 var productsSchema = new mongoose.Schema({
    nombre: { type: String, unique: false, required: false, trim: true },
    descripcion: { type: String, unique: false, required: false, trim: true },
    cantidad: { type: Number, unique: false, required: false, trim: true },
    precio: { type: Number, unique: false, required: false, trim: true },
    img: { type: String, unique: false, required: false, trim: true },
    codigo:{type:Number, unique:false, requiered:true, trim: true}

},{collection:'products'});


productsSchema.statics.findAll = function(callback){
    products.find({},function(err,products) {
        if(err)
            return callback(err);
        else if(!products)
            return callback();
        return callback(null,products);
    })
}

productsSchema.statics.findM = function(callback){
    products.find({codigo:1}, function(err,products) {
        if(err)
            return callback(err);
        else if(!products)
            return callback();
        return callback(null,products);
    });
}

productsSchema.statics.findL = function(callback){
    products.find({codigo:2}, function(err,products) {
        if(err)
            return callback(err);
        else if(!products)
            return callback();
        return callback(null,products);
    });
}

productsSchema.statics.findA = function(callback){
    products.find({codigo:3}, function(err,products) {
        if(err)
            return callback(err);
        else if(!products)
            return callback();
        return callback(null,products);
    });
}

productsSchema.statics.findE = function(callback){
    products.find({codigo:4}, function(err,products) {
        if(err)
            return callback(err);
        else if(!products)
            return callback();
        return callback(null,products);
    });
}


productsSchema.statics.insert = function(nombre,descripcion,precio,cantidad,img, codigo,callback){
    products.findOne({nombre:nombre},'nombre',function(err,user){
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
                cantidad:cantidad,
                img: img,
                codigo: codigo
            };
            products.create(data,function(err){
                if(err)
                    return callback(err);
                return callback();
            })}
    })   
}
productsSchema.statics.update = function(nombre,descripcion,precio,cantidad,img,codigo,callback){
    products.findOne({nombre:nombre},'nombre descripcion precio cantidad img',function(err,user){
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
                if(img)
                    user.img = img;
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

productsSchema.statics.delete = function(nombre,callback){
    products.findOne({nombre:nombre},'nombre',function(err,users){
        if(err)
            return callback(err);
        else if(!users)
            return callback(null,'nombre no existe');
        products.deleteOne({nombre:nombre}, function(err){
                if(err)
                    return callback(err);
                return callback();//Success
            });
    })   
}

let products = mongoose.model('products',productsSchema);

module.exports = products;