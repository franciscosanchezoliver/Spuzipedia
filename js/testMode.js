var statisticBoxIsHidden = false;

document.addEventListener('keydown', function(event) {
    detectKeyCombination(event, this)
});


(function addStyleToThePage() {
    var cssId = 'questionsCss';
    var head = document.getElementsByTagName('head')[0];
    var link = document.createElement('link');
    link.id = cssId;
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = '../estilos/questions.css';
    link.media = 'all';
    head.appendChild(link);
})();

(function createStatisticDiv() {
    let statisticDiv = document.createElement("div")
    statisticDiv.setAttribute("class", "statisticsBox");

    let numCorrectQuestions = document.createElement("p");
    numCorrectQuestions.innerText = "X corrects";
    numCorrectQuestions.setAttribute("id", "numCorrectQuestions");
    numCorrectQuestions.setAttribute("class", "statisticInfo correct");
    statisticDiv.appendChild(numCorrectQuestions);

    let numIncorrectQuestions = document.createElement("p");
    numIncorrectQuestions.innerText = "X incorrects";
    numIncorrectQuestions.setAttribute("id", "numIncorrectQuestions");
    numIncorrectQuestions.setAttribute("class", "statisticInfo incorrect");
    statisticDiv.appendChild(numIncorrectQuestions);

    let totalQuestions = document.createElement("p");
    totalQuestions.innerText = "X total";
    totalQuestions.setAttribute("id", "totalQuestions");
    totalQuestions.setAttribute("class", "statisticInfo total");
    statisticDiv.appendChild(totalQuestions);

    let percentageOfSuccess = document.createElement("p");
    percentageOfSuccess.innerText = "porcentaje %";
    percentageOfSuccess.setAttribute("id", "percentageOfSuccess");
    percentageOfSuccess.setAttribute("class", "statisticInfo percentage-success");
    statisticDiv.appendChild(percentageOfSuccess);

    // add button to start or stop the test
    let startButtton = document.createElement("button");
    startButtton.addEventListener("click", startTest);
    startButtton.setAttribute("id", "start-button")
    startButtton.innerText ="Test me!";
    statisticDiv.appendChild(startButtton);

    // Statistic box start as a hidden box
    statisticDiv.style.visibility = "hidden";

    let body = document.getElementsByTagName("body")[0];
    body.appendChild(statisticDiv);

    //initialice values for statistics
    updateStatisticDiv();
    importChartJs(); //import library chart.js

})();

function startTest(){
    changeQuestionsForInputs();
    addClockToStatisticDiv();
    let startButton = document.getElementById("start-button")
    startButton.innerText = "Stop asking me!";
    startButton.addEventListener("click", stopTest);
}

function stopTest(){
    restartTest();
}

/**
 * Hide or show the statistic box by clickin on the div
 */
function hide(){
    let statisticBox = document.getElementsByClassName("statisticsBox")[0];
    statisticBox.style.visibility =  statisticBox.style.visibility != "hidden" ? "hidden" : "visible";
}

function addClockToStatisticDiv(){
    let statisticBox = document.getElementsByClassName("statisticsBox")[0];
    let clock = document.createElement("p");
    clock.innerText="";
    clock.setAttribute("id", "countDownTimer");

    statisticBox.appendChild(clock);

    // Set the date we're counting down to
    //var countDownDate = new Date("Jan 5, 2019 15:37:25").getTime();
    var countDownDate = new Date().getTime();

    // Update the count down every 1 second
        var x = setInterval(function() {

        // Get todays date and time
        var now = new Date().getTime();

        // Find the distance between now and the count down date
        var distance = now - countDownDate;

        // Time calculations for hours, minutes and seconds
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);


        // Display the result in the element with id="demo"
        clock.innerHTML = hours + ":"
        + minutes + ":" + seconds;

        // If the count down is finished, write some text 
        if (distance < 0) {
            clearInterval(x);
            clock.innerHTML = "EXPIRED";
        }
    }, 1000);

}


// Add the library chart.js to the page
function importChartJs(){
    let script = document.createElement("script");
    script.src = "../js/chart.js";

    // when loaded create graph
    script.onreadystatechange = addGraphToDocument;
    script.onload = addGraphToDocument;

    // Fire the loading
    document.head.appendChild(script);
};

function addGraphToDocument(){
    createStatisticGraph();
}

 function createStatisticGraph(){
     let graphCanvas = document.createElement("canvas");
     graphCanvas.setAttribute("id", "statistic-graph");
     // Width and height of the graph
     graphCanvas.style.width ="250px";
     graphCanvas.style.height ="185px";
    let statisticBox = document.getElementsByClassName("statisticsBox")[0];
    statisticBox.appendChild(graphCanvas);

    var ctx = document.getElementById("statistic-graph").getContext('2d');
    myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["OK", "Fail", "Total"],
            datasets: [{
                label: 'Success',
                data: [0, 0, getTotalAnswer()],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });

 }

 function updateStatisticGraph(){
     //correct bar
    myChart.data.datasets[0].data[0] = getCorrectAnswer().length ; 
    //incorrect bar
    myChart.data.datasets[0].data[1] =  getIncorrectAnswer().length;
    myChart.data.datasets[0].data[2] = getTotalAnswer();
    myChart.update();

    if(checkIfAllQuestionAreCorrectlyAnswered()) showWinningMessage();
 }

 function showWinningMessage(){
    console.log("win!");
    let winningBox = document.createElement("div")
    winningBox.setAttribute("class", "winning-box");
    let message = document.createElement("p");
    message.innerText = "You are a fucking beast!";
    winningBox.appendChild(message);
    let body = document.getElementsByTagName("body")[0];
    body.appendChild(winningBox);
 }

 function checkIfAllQuestionAreCorrectlyAnswered(){
    return calculatePercentageOfSuccess() == 100;
 }

function updateStatisticDiv(numCorrect, numIncorrect) {
    let numOfCorrectAnswer = getCorrectAnswer().length;
    let numOfIncorrectAnswer = getIncorrectAnswer().length;
    let totalOfAnswer = numOfCorrectAnswer + numOfIncorrectAnswer + getQuestionsNotAnsweredYet();
    let percentageOfSuccess = calculatePercentageOfSuccess();

    document.getElementById("numCorrectQuestions").innerText = `${numOfCorrectAnswer} correct`;
    document.getElementById("numIncorrectQuestions").innerText = `${numOfIncorrectAnswer} incorrect`;
    document.getElementById("totalQuestions").innerText = `${totalOfAnswer} total`;
    document.getElementById("percentageOfSuccess").innerText = `${percentageOfSuccess}% success`;
}

function changeQuestionsForInputs() {
    var questions = document.getElementsByTagName("question");
    var i = 0;
    for (i = 0; i < questions.length; i++) {
        let q = questions[i];
        let correctAnswer = q.innerText;
        q.innerHTML = `<input type="text" id="${i}" data-answer="${correctAnswer}" class="question" onfocusout="checkIfCorrect(this)" onkeydown="detectKeyCombination(event, this)" value=""  autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">`
    }
};

function checkIfCorrect(element) {
    if (element.value == "") {
        markAsNotAnswered(element);
    }
    else {
        if (isEqual(element.getAttribute("data-answer"), element.value))
            markAsCorrectAnswer(element)
        else
            markAsIncorrectAnswer(element);
        updateStatistics();

    }
}

function updateStatistics(){
    updateStatisticDiv();
    updateStatisticGraph();
}

/**
 * If the user press cntrl + space the question will be answered correctly
 */
function detectKeyCombination(event, element) {
    // We are in a input
    if(!checkIfEventIsInGeneralDocument(element)){
        // Control + Space : autocomplete with correct answer
        if (isControlSpace(event))
            fillWithCorrectAnswer(element);
        // Control + Shift : clear input    
        else if(isControlBackspace(event)) {
            clearValueOfInput(element);
        }
        // Control + Supr : Restart the test
        else if (isControlSupr(event)){
            restartTest();
        }
    }

     if (isAltH(event)){ // Alt + H to hide the statistic div
        hide();
    }
}

function checkIfEventIsInGeneralDocument(element){
    return element == document;
}

function restartTest(){
    location.reload();
}


function clearValueOfInput(element){
    element.value = "";
}

/**
 * Restart the test by realoading the page
 */
function isControlSupr(event){
    return event.ctrlKey && event.keyCode == 46;
}

/**
 * Alt + h  ->  Hide/show statistic div
 */
function isAltH(event){
    return event.altKey && event.keyCode == 72;
}

/**
 * Autocomplete the input with the correct answer
 */
function isControlSpace(event){
    return event.ctrlKey && event.keyCode == 32;
}

/**
 * Clear the value of the input, control + shift
 */
function isControlBackspace(event){
    return event.ctrlKey && event.keyCode == 16;
}
/**
 * Focus next input
 */
function isEnter(event){
    return event.keyCode == 13;
}

function fillWithCorrectAnswer(element){
    let correctValue = element.getAttribute("data-answer");
    element.value = correctValue;
}


function isEqual(correctAnswer, userAnswer) {
    return correctAnswer.toLowerCase() == userAnswer.toLowerCase();
}


function getCorrectAnswer() {
    return document.getElementsByClassName("correct-answer");
}

function getIncorrectAnswer() {
    return document.getElementsByClassName("incorrect-answer");
}

function getQuestionsNotAnsweredYet() {
    return document.getElementsByTagName("question").length;
}

function getTotalAnswer() {
    return getCorrectAnswer().length + getIncorrectAnswer().length + document.getElementsByClassName("question").length;
}

function calculatePercentageOfSuccess() {
    let numOfCorrectAnswer = getCorrectAnswer().length;
    let numOfIncorrectAnswer = getIncorrectAnswer().length;
    let numOfQuestions = getTotalAnswer();
    return (numOfQuestions > 0) ? (numOfCorrectAnswer / numOfQuestions * 100).toFixed(2) : 0;

}

function markAsCorrectAnswer(element) {
    let green = "#00ff00";
    changeColor(element, green);
    element.setAttribute("class", "correct-answer");
}

function markAsIncorrectAnswer(element) {
    let red = "#f44336";
    changeColor(element, red);
    element.setAttribute("class", "incorrect-answer");
}

function markAsNotAnswered(element) {
    let white = "#fff";
    changeColor(element, white);
    element.setAttribute("class", "question");
}


function changeColor(element, newBackgroundColor) {
    element.style.backgroundColor = newBackgroundColor;
}
