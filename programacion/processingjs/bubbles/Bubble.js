/**
 * @param {*} pos : Initial cell's position
 * @param {*} rad : Initial cell's radius
 */
function Bubble(pos , rad) {
    this.position = pos;
    this.radius = rad;
    this.colour = color(random(50,200),random(50,200),random(50,200))

    /**
     * Move the bubble through screen
     */
    this.move = function () {
        let velocity = p5.Vector.random2D();
        this.position.add(velocity);
        this.show();
    }

    /**
     * Draws the cell into the screen
     */
    this.show = function () {
        stroke(this.colour);
        noFill();
       // fill(80);
        ellipse(this.position.x, this.position.y, this.radius, this.radius);
    }

}