const express = require('express');
const validacion = require('./validacion.js');
const rp = require('request-promise');

async function enviarBd( data , respuesta ){

    var request = {
        url: 'https://reclutamiento-14cf7.firebaseio.com/personas.json',
        method: 'get'/*,
        body: JSON.stringify(temp)*/
    }
    
    var objTemp = {
            codigo: 0,
            msg: ""
    }
    
    var res = await rp(request)
                        .then((res)=>{
                            console.log("Todo okay");
                            objTemp.codigo = 200;
                            objTemp.msg = `Se agrego a la persona a la base de datos y se asigno el id: ${res} `
                            
                        })
                        .catch((err)=>{
                            console.log("Ocurrio un error");
                            objTemp.codigo = 500;
                            objTemp.msg = 'Ocurrio un error inesperado';
                            
                        })
    
    return objTemp;

}

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



app.post('/crearPersonas', async (req, res) =>{

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
    
    // envio a la base de datos. respuesta = Promise de un obj JSON generado en la funcion
    var respuesta = await enviarBd(temp, res);
    
    console.log(`codigo: ${respuesta.codigo}`);
    
    res.status(respuesta.codigo);
    res.send(respuesta.msg);

})
