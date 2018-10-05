
let questions = [
    "What is your name?",
    "What is your favourite hobby?",
    "What is your preferred programming language?"
];

let answers = [];

function ask(i){
        process.stdout.write(`${questions[i]} > `);
}

ask(0);

// So I'm going to go ahead and go back to Sublime, and then from Sublime what I want to do is right under
// this function here I'm going to wire up an event listener for data on the standard input object. So process.stdin,
// standard input, on data. So when a data event is raised, this means that when the user types some data into
// the Terminal and hits enter we will raise this data event here. 
// So when the user enters some data, or when any data is sent to our application through the standard input 
// object this callback function will fire and that data that is sent to our application will come in as an argument. 


// Cuando el usuario (o otro programa) introduce datos por la entrada estandar (la consola normalmente) se activará este
// evento. Esto quedará constantemente encendido hasta que paremos el programa (por ejemplo con control + C o  
// )

process.stdin.on("data",function(data){
    answers.push(data.toString().trim());
    // Preguntamos tantas veces como preguntas haya que hacer
    if(answers.length < questions.length){
        ask(answers.length);
    }
    // Cuando hayamos preguntado todo entonces podemos parar el programa
    else{
        process.exit();
    }
});

// So we can add another listener that is listening for an exit event on the process object. process.on exit will 
// listen for an exit event on the process object. And when the process.exit is invoked this callback function 
// will fire. So when we exit the process we can do a couple of things just before the process exits. 

// Cuando terminamos la aplicación usando "process.exit" (si salimos usando control+c no se lanzará este evento) 
// podemos ejecutar código
process.on("exit", function(){
    process.stdout.write(`Your answers were:\n`);
    answers.forEach(answer=> process.stdout.write(`${answer}\n`));
});