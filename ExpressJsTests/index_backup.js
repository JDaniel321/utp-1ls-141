var express = require('express');
var app = express();

//Rutas

app.get('/', function(req, res){
    res.send("holaaa..!");
});
//control c (reinicia terminal) -> node index.js

app.get('/clientes', function(req, res){
    res.send('clientes')
});

 app.get('/api/clientes', function(req, res){ 
     var clientes = [
         {  nombre: 'Janeth',
            apellido: 'Rojas',
            edad: 21,
         },
         {
            nombre: 'Boluda',
            apellido: 'boludona',
            edad: 22, 
         }
     ]
     res.send(JSON.stringify(clientes));
 });
 
 app.post('/api/clientes', function(req, res){
     var creado = {
         nombre: 'No',
         apellido : 'se', 
         edad: 20,
     }
     res.send(JSON.stringify(creado));
 });
 
app.put('/api/clientes/1', function(req, res){
    var editado = {
        nombre : 'Pedro',
        apellido : 'Ramos',
        edad : 25
    }
    res.send(JSON.stringify(editado));
})

app.delete('/api/clientes/1', function(req, res){
    var eliminado = {
        nombre : 'Hector',
        apellido : 'Vazques',
        edad : 22
    }
    res.send(JSON.stringify(eliminado));
})

app.listen(3000,function(){
    console.log('Escuchando en el puerto 3000')
})

//instalar npm install --save express paso uno

//terminal: node index.js

//instalar npm install -g nodemon paso 3