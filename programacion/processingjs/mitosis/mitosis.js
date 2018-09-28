const initialNumberOfCells= 1;

function setup() {
    createCanvas(400, 400);
    cell = new Cell();
    cells = [];//array with all the cells
    //create 3 cells
    for(let i = 0 ; i < initialNumberOfCells ; i ++){
        cells.push(new Cell());
    }

}

function draw() {
    ellipse(50, 50, 80, 80);
    background(50);
    moveCells();
}

/**
 * Detect the mouse click
 */
function mouseClicked(){
    //check which cell has been clicked
    //The user kills the cells when click on it
    for(let i = 0 ; i < cells.length; i++){
        if(cells[i].hasBeingClicked(mouseX, mouseY) {
            cells.push(new Cell());
            var position = cells[i].getPosition();
            var xChild1 = position.x -20;
            cells.push( cells[i].createChild() );
        }
    }
}

/**
 * Move all the cells
 */
function moveCells(){
    for(let i = 0 ; i < cells.length ; i++){
        cells[i].move();
    }
}
