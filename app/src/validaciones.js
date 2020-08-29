

function validarTipo (nombre , tipo){ 
    
    if (typeof nombre === tipo){
        return true;
    }
    else return false;

} 

function validarDni (dni , tamaño){

    if(typeof dni !== 'number' || dni.toString().length > 10 ){
        return false;
    }

    return true;
}


module.exports = {
    validarTipo,
    validarDni,
}