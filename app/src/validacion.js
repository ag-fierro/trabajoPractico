function validarTipo(nombre, tipo) {
  if (typeof nombre !== tipo) {
    throw new Error(`El tipo de dato no es el esperado (${tipo})`);
  } else return true;
}

function validarDni(dni, tam) {
  if (dni.toString().length > tam) {
    throw new Error(`El DNI exede el maximo tamaño posible (${tam})`);
  }

  return true;
}

function validarCant(obj) {
  if (Object.keys(obj).length > 3) {
    throw new Error(`El objeto no puede tener mas de 3 elementos`);
  }
  return true;
}

function existe(data) {
  if (!data) {
    throw new Error(`Se debe ingresar un nombre y apellido obligatoriamente`);
  }
  return true;
}

function validarObj(obj) {
  validarCant(obj);
  existe(obj.nombre);
  existe(obj.apellido);
  validarTipo(obj.nombre, "string");
  validarTipo(obj.apellido, "string");
  validarTipo(obj.dni, "number");
  validarDni(obj.dni, 10);

  return true;
}

module.exports = { validarObj };
