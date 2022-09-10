function laCajaDePandora(number){
    // proximamente escribiremos codigo aqui
    let num = number;
    if (num%2===0){
        let binary = (num % 2).toString();
    for (; num > 1; ) {
        num = parseInt(num / 2);
        binary =  (num % 2) + (binary);
    }
    }
    else {
        if (number < 0)
  {
    number = 0xFFFFFFFF + number + 1;
  }

  return number.toString(16).toUpperCase();
}
    }
  
   function gabriel(){
    let misDatos=[{
        nombre:'gabriel'},
       { apellido:'nesteruk'},
       { edad:'21'},
       { nacionalidad:'argentino'}
    ]
    return  misDatos
   } 