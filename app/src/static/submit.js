async function enviarReq(){

    event.preventDefault();

    // Tomo los valores del formulario desde el DOM
    var _nombre = document.getElementById("nombre").value;
    var _apellido = document.getElementById("apellido").value;
    var _dni = document.getElementById("dni").value;

    _dni = parseInt(_dni);

    // Se convierte a un objeto JS
    var temp = {
            nombre: _nombre,
            dni: _dni,
            apellido: _apellido
            
    }
   
    var opciones = {
        method: 'POST',
        headers: {
            'content-type':'application/json' , 
            'timeout':  3500
        },
        body: JSON.stringify(temp)
    }
 

const respuesta = await fetch('/crearPersonas', opciones );
const data = await respuesta.json();
      
    switch(data.status){

        case 201: 
            var ID = JSON.parse(data.mensaje);
            alert(`Se envio a la base de datos correctamente y se asigno el id: ${ID.name}`);
            break;
        case 400:
            alert(`Ocurrio un error con el formato del formulario.\n${data.mensaje}`);
            break;
        case 500:
            alert(`Ocurio un error inesperado. \n ${data.mensaje}`);
            break;
    }
        

}