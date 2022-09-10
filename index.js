function laCajaDePandora(numero){
    // proximamente escribiremos codigo aqui
    if(numero%2 === 0){
        let binario = (numero).toString(2)
        return binario;
    } else if(numero%2 === 1){
        let hexadecimal = (numero).toString(16)
        return hexadecimal;
    }
    }

function agustin(){
    var obj = {
        nombre: "Agustín",
        edad: 25,
        nacionalidad: "Argentina"
    }
    return obj;
}