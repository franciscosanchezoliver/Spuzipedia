
/**
 * Count down timer class
 * parameters:
 *   time: time in seconds left
 */

function CountDownTimer(time) {
    this.startTime = new Date(); //Creation's time
    this.timeLeft = time*1000; //Time left in seconds

    /**
     * Update the time left
     */
     this.updateTimer = function () {
        return -(this.startTime - new Date());
    }
    

    /**
     * Return true if the time count down timer has finished
     */
    this.hasFinish = function(){
        return this.timeLeft < this.updateTimer() ; 
    }

    this.setTimeLeft = function(newTime){
        this.timeLeft = newTime;
    }

}