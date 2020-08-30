
function enviarReq(){

    // Tomo los valores del formulario desde el DOM
    var _nombre = document.getElementById("nombre").value;
    var _apellido = document.getElementById("apellido").value;
    var _dni = document.getElementById("dni").value;

    _dni = parseInt(_dni);

    // Se convierte a un objeto JS
    var data = {
            nombre: _nombre,
            dni: _dni,
            apellido: _apellido
            
    }

    var opciones = {
        method: 'POST',
        headers: {
            'content-type':'application/json'
        },
        body: JSON.stringify(data)
    }

    fetch('/crearPersonas', opciones ).then( res => {

        alert("Se agrego a la persona a la base de datos");

    })
    
       
}