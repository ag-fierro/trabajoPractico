const express = require('express');
const validacion = require('./validacion.js');
const rp = require('request-promise');


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

    var temp = req.body;

    try{
        validacion.validarObj(temp);
    }catch (e){
        // Si la validacion no salió bien salgo sin mandar a la bd.
        console.log(e.message);
        res.status(400);
        res.send(e.message);
        return;
    }  
    
    //request a la bd.
    var request = {
        url: 'https://reclutamiento-14cf7.firebaseio.com/personas.json',
        method: 'get'/*,
        body: JSON.stringify(temp)*/
    }
    
    var code = 500, msg = "Error inesperado";

    rp(request)
    .then( (resBd) => {  

        console.log("Se envio correctamente al servidor" + resBd);
        res.code(200);
        res.send(resBd);

        // Este res.send() no funciona porque esta en el scope del callback, si lo moves afuera llega al cliente perfectamente.

    })
    .catch( (err) => {

        console.log( `Se ha producido un error. ${err}`);
        res.code(500);
        res.send(resBd);

    });
  

})