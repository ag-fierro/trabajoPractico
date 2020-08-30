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

    console.log(req.body); 
    var temp = req.body;

    try{
        validacion.validarObj(temp);
    }catch (e){
        // Si la validacion no esta bien devuelvo sin mandar a la bd.
        console.log(e.message);
        res.status(400);
        res.send(e.message);
        return;
    }  

    //request a la bd.
    var request = {
        url: 'https://reclutamiento-14cf7.firebaseio.com/personas.json',
        method: 'POST',
        body: JSON.stringify(temp)
    }

    rp(request)
    .then( (resBd) => {        
        res.status(resBd.status);
        res.send(temp); 
        console.log("Se envio correctamente al servidor" + temp);
        return;   
        
    })
    .catch( (err) => {
        console.log( `Se ha producido un error. ${err}`);
        return;
    });
  
})