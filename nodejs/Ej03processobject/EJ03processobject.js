// One important object that is available to us globally is the process object.It can be accessed from anywhere,
// and it contains functionality that allows us to interact with information about the current process instance.
// We can use the process object to get environment information, read environment variables,
// communicate with the terminal, or parent processes, through standard input and standard output.
// We can even exit the current process.This object essentially gives us a way to work with the current
// process instance.One of the the things that we can do with the process object is to collect all the
// information from the terminal, or command prompt, when the application starts. 
// All of this information will be saved in a variable called process.argv which stands for the argument 
// variables used to start the process. 

// Imprimos las variables del proceso, si no le hemos pasado argumento al ejecutar este fichero (es decir 
// node nombrefichero.js) entonces veremos que process.argv es un array de 2 valores (la ruta de ejecutable
// de node , y el fichero que estamos ejecutando). 
// Pero podemos ejecutar este ficheor passandole parámetros, para ello ejecutamos el fichero de la siguiente
// manera: node nombrefichero.js --parametro1 Spuzi --parametro2 "Good day Sir" . En este caso veremos que 
// la variable global process.argv tiene ahora 2 nuevos parametros
console.log(`imprimimos el valor de process.argv: ${process.argv}`)


