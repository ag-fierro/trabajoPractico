const rp = require('request-promise');

request = {
    method: 'get',
    url: 'https://reclutamiento-14cf7.firebaseio.com/personas.json'    
}

rp(request)
    .then( (res) => {
            personas = JSON.parse(res);
            console.log(personas);
    })
    .catch( (err) => {
            console.log( `Se ha producido un error. ${err}`);
    })
