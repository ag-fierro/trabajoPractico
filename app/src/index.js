const express = require('express');
const vd = require('/validacion.js');

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
    var temp = req.body

    

    res.status(200);
    res.send(temp);     

})