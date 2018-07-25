function control2(){
   var i = $("#num1").val();
   matriz(i);
}

function control3(){
  var str = $("#cadena").val();
  palindromo(str);
}

function matriz(i){
   var ind = i-1;
   var matriz = [], x = 0;
   if(i%2==0){
        for(var n=0; n<i; n++){
          matriz [n] = [];
          for(var j=0; j<i; j++){ 
             x= Math.floor(Math.random() * 1000) + 1;
             var mol = x%23;
             matriz[n][j]=x;
             if(n!=j){
                 matriz[n][j]=x;
             }else if (n==j){
                if(mol==0)
                 matriz[n][n]=x; 
                else
                 j = j - 1;     
              }else if(n== (j+i-1)){
                if(x%x!=0 && x%1!=0){
                matriz[j][j]=x;
                }
                else
                j = j +1;                                                  
              }  
            }
          }
      }
    else{
      for(var n=0; n<i; n++){
        matriz [n] = [];
          for(var j=0; j<i; j++){ 
            x= Math.floor(Math.random() * 1000) + 1;
            var mol = x%23;
            matriz[n][j]=x;
            if(n!=j){
              matriz[n][j]=x;
            }
            else if (n==j){
              if(mol==0)
                matriz[n][n]=x;
              else
                j = j - 1;
            }
            else if(n== (j+i-1)){
              if(x%x!== 0 && x%1!==0)
                 matriz[j][j]=x;  
            }
          }
        }
        var r =Math.floor(matriz.length/2) ;
        matriz[r][r]=23;              
      }
  console.log(matriz);
  $('.modal-body').html(' '+matriz + '\n');      
}

function palindromo(str){
  var num = [];
  var i = str.length;
  for (var n = 0; n < i.length; n++) {
    num[n] = str.charAt(n);
    console.log(n);    
  }
  console.log(num);
  $('.modal-body').html(num);
}
