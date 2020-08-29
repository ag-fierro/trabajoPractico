const express = require('express');
const vd = require('./validaciones.js');


const app = express();

app.use(express.json());

const puerto = 3000;

console.log(__dirname);


// Iniciando el servidor en el puerto seleccionado.
app.listen(puerto , () =>{
    console.log(`Servidor iniciado en el puerto ${puerto}`);
})

// Enviar archivos que estan en la carpeta static cuando el navegador haga un GET / 
app.use(express.static( __dirname + "/static"));



app.post('/crearPersonas', (req, res) =>{

    console.log(req.body);  

    var temp = req.body;    
 
        //Validaciones sobre la informacion ingresada
        if( Object.keys(temp).length > 3 ){
            // si la cantidad de atributos dentro del objeto temporal es mayor a los necesarios.
            res.status(400);
            res.send("Solo se admiten 3 campos (Nombre, Apellido y Dni) ");
            return;
        }

        if( !vd.validarDni(temp.dni, 10 )){
            // si el dni no es un numero o si tiene mas de 10 dígitos.
            res.status(400);
            res.send("El dni debe ser un numero con menos de 10 caracteres");
            return;
        }

    // Todo okay envio codigo 200 y el objeto que se ingresó.
    res.status(200);
    res.send(temp);     

})