const express = require('express');
const validacion = require('./validacion.js');
const rp = require('request-promise');

async function enviarBd( data , respuesta ){

    var request = {
        url: 'https://reclutamiento-14cf7.firebaseio.com/personas.json',
        method: 'post'/*,
        body: JSON.stringify(data)*/
    }
    
    var objTemp = {
            codigo: 0,
            msg: ""
    }
    
    await rp(request)
            .then((res)=>{
                console.log(res);
                objTemp.codigo = 201;
                objTemp.msg = res;
            })
            .catch((err)=>{
                console.log(`Ocurrio un error${err}`);
                objTemp.codigo = 500;
                objTemp.msg = 'Ocurrio un error inesperado';

            })
            .finally(()=>{

                console.log("Esta request termino");
                respuesta.status( objTemp.codigo );
                respuesta.send(objTemp.msg);
                console.log("Se envio la respuesta");
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
    
    
    // envio a la base de datos. respuesta = un obj JSON generado en la funcion
    var respuesta = await enviarBd(temp, res);
    /*
    console.log(`codigo: ${respuesta.codigo}, mensaje: ${respuesta.msg}`);
    
    res.status(respuesta.codigo);
    res.send(respuesta.msg);
    */
})