
/**
 * Cell class
 */
function Cell(pos, rad, col) {
    //Initialize the cell's in a random position 
    this.position = pos || createVector(random(width), random(height));
    //Initialize the cell's size to a random size 
    this.radius = rad || random(20, 80);
    //Initialize the cell's color to a random size 
    this.color = col || color(random(50, 255), random(50, 255), random(50, 255));
    //Initialize the cell's life time to a random time in seconds
    this.lifeTimer = new CountDownTimer(random(10, 15));
    //Speed which the cell die
    this.dieSpeed = random(0.2, 0.6);
    //Cell's state, it can be 1: alive or 2: dead
    this.state = 1;

    this.setPosition()

    this.getPosition = function(){
        return this.position;
    }

    /**
     * Moves the cell through the screen
     */
    this.move = function () {
        if (this.isAlive()) {
            if (!this.hasLifeTime()) {
                this.die();
            }
            var velocity = p5.Vector.random2D(); //create a random vector for the velocity
            this.position.add(velocity);//apply some random velocity to the cell 
            this.show(); //draws the cell into the canvas
        }
    }

    /**
     * Draws the cell into the screen
     */
    this.show = function () {
        fill(this.color);//color the cell
        ellipse(this.position.x, this.position.y, this.radius, this.radius);//draws the actual cell
    }

    /**
     * Returns true if the cell has time to live
     */
    this.hasLifeTime = function () {
        return !this.lifeTimer.hasFinish();
    }

    /**
     * Start the dying process
     */
    this.kill = function(){
        this.lifeTimer.setTimeLeft(-1);
    }

    /**
     * Terminate the life of the cell by making it's size smaller
     */
    this.die = function () {
        if (this.radius > 0) {
            this.radius -= this.dieSpeed;
        } else {
            this.state = 0;
        }

    }

    /**
     * Returns true if the cell is alive
     */
    this.isAlive = function () {
        return this.state == 1;
    }


    /**
     * Returns true if the cell has been clicked by calculating if the user has clicked inside the cell
     */
    this.hasBeingClicked = function(mouseX, mouseY){
        var distance = dist(mouseX, mouseY, this.position.x, this.position.y);
        return (distance < this.radius);
    }

    /**
     * Create a child half the size
     */
    this.createChild = function(){
        var childPosition = this.position ;
        childPosition.x += 100;
        childPosition.y += 100;
        //childPosition.add(createVector(random(-50, 50), random(-50, 50)));
        return new Cell(childPosition, this.radius/2, this.color);
    }
}