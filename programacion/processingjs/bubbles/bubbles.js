
const numberOfBubbles = 50;

function setup(){
    createCanvas(400,400);

    //array to store all the bubbles
    bubbles = [];
    for(let i = 0 ; i < numberOfBubbles ; i++){
        let position = createVector(random(width), random(height));
        let radius = random(30,60);        
        bubble = new Bubble(position, radius);
        bubbles.push(bubble);
    }

}

function draw(){
    background(255);
    moveBubbles();
}

function moveBubbles(){
    for(let i = 0 ; i < numberOfBubbles ; i++){
        bubbles[i].move();
    }
}