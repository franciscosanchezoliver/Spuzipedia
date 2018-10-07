//Podemos incluir un modulo js usando: require("nombre del mudulo"). Hay un módulo que se encuentra
// de forma global en node que es "path" que nos ayuda a trabajar con rutas
let path = require ("path");
console.log(`El nombre del fichero (quitando la ruta) es: ${path.basename(__filename)}`);