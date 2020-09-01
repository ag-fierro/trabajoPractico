const express = require("express");

const validacion = require("./validacion.js");
const enviar = require("./enviarPersona.js");

const app = express();
app.use(express.json());

const puerto = 3000;

// Iniciando el servidor en el puerto seleccionado.
app.listen(puerto, () => {
  console.log(`Servidor iniciado en el puerto ${puerto}`);
});

// Enviar archivos que estan en la carpeta static cuando el navegador haga un GET /
app.use(express.static(__dirname + "/static"));

app.post("/crearPersonas", async (req, res) => {
  var temp = req.body;

  console.log(temp);

  try {
    validacion.validarObj(temp);

    enviar.enviarBd(temp, res);
  } catch (e) {
    res.status(400);
    res.json({
      status: 400,
      mensaje: e.message,
    });
    return;
  }
});
