        (function(){
            var nombre ="hola";
            var apellido="mundo";
            console.log("el profesor es: " + nombre + " " + apellido +".");
            var estudiante;
            console.log("estudiante que va a pasar: " + estudiante);

            function pasitas(a,b, callback){
                return callback(a + b);
            }
            console.log(pasitas(10,10, function(a){
                return a/2;
            }));

            function _sortNumero(a, b){
                return a - b;
            }

            function _sort(a){
                return a.sort(_sortNumero);
            }

            function _add(a){
                var acum=0;
                for (let index = 0; index < a.length; index++) {
                     acum += a[index];
                    
                }
                return acum;
            }

            function generarrandom(callback){
                var quantity = 5; random = [];
                for (let index = 0; index < quantity; index++) {
                    random.push(Math.floor((Math.random() * 10) + 1));
                }
                console.log(random);
                return typeof(callback) !== "undefined"? callback(random): random;
            }
            console.log(generarrandom(_sort));
            console.log(generarrandom(_add));
        })();