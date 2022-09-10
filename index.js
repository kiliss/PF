function laCajaDePandora(numero) {
    // proximamente escribiremos codigo aqui
    if (Number.isInteger(numero)) {
        if (numero % 2 == 0) {
            return numero.toString(2)
        } else {
            return numero.toString(16)
        }
    }
    return "No es entero";
}

function anderson(){
    return {
        nombre:anderson,
        edad: 22,
        nacionalidad: Colombia
    }
}