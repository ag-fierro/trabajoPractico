const rp = require('request-promise');

function enviarBd( data , res){

    var request = {
        url: 'https://reclutamiento-14cf7.firebaseio.com/personas.json',
        method: 'post',
        body: JSON.stringify(data)
    }
    
    rp(request)           
        .then((resbd)=>{
            
            console.log(`Se agrego a una persona a la base de datos con ID: ${resbd}`);
            res.status(201);
            console.log(resbd);
            res.json({
                status: 201,
                mensaje: resbd
            });                
        
        })
        .catch((err)=>{

            console.log(`Ocurrio un error "${err.message}" `);
            res.status(500);
            res.json({
                status: 500,
                mensaje: err.message
            });
            return false;
        })
    
        return true;

}

module.exports = {enviarBd};
