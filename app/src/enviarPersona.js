const rp = require('request-promise');

function enviarBd( data , res){

    var request = {
        url: 'https://reclutamiento-14cf7.firebaseio.com/personas.json',
        method: 'post',/*,
        body: JSON.stringify(data)*/
    }
    
    rp(request)           
        .then((resbd)=>{
            
            console.log(`Se agrego a una persona a la base de datos con ID: ${resbd}`);
            res.status(201);
            res.send(resbd);                
        
        })
        .catch((err)=>{

            console.log(`Ocurrio un error "${err}" `);
            res.status(500);
            res.send(err);
            return false;
        })
    
        return true;

}

module.exports = {enviarBd};
