
// llama a este programa pasandole argumentos, esto se hace de la siguiente manera:
// node nombreprograma --argument1 "este es el argumento 1" --argumento2 "este es el argumento 2"

console.log(process.argv);
console.log(process.argv.length);
console.log(process.argv.indexOf("--usuario"));

if (process.argv.length < 3) {
    let mensaje = `llama a este programa pasandole argumentos, esto se hace de la siguiente manera:
     node nombreprograma --argument1 "este es el argumento 1" --argumento2 "este es el argumento 2`;
    console.log(mensaje);
}
// Recogemos los valores que ha mandado el usuario por parametro
else {
    console.log(`Los argumentos que has pasado por parametro son:`);
    for (let i = 2; i < process.argv.length;i++) {
        console.log(`argumento ${i}: ${process.argv[i]}`);
    }
}