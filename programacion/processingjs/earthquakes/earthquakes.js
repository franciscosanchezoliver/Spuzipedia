const pi = Math.PI;
var imageMap;

//token to interact with www.mapbox.com
token = "pk.eyJ1Ijoic3B1emkiLCJhIjoiY2pkdTA3dXBrMWU4MzJ2cGpnNXJtbDR6ayJ9.H78YgGyFv8Xr6SxX1olk5A";
//size of the image map
widthMap = 1024;
heightMap = 512;
//center of the earth
latitude = "0";
longitude = "0";
//Angle which you see the map
angle = "0";
zoom = "1";

function preload() {
    //load the image from https://www.mapbox.com
    imageMap = loadImage("https://api.mapbox.com/styles/v1/mapbox/streets-v10/static/" + latitude + "," + longitude + "," +
     zoom + ",0," + angle + "/"+widthMap+"x"+heightMap+"?access_token="+token);
}

function setup() {
    createCanvas(widthMap, heightMap);
    //move the origin point from the top left corner to the center, to work from the center
    translate(width / 2, height / 2); 
    //so the world image is draw from the center
    imageMode(CENTER);
    image(imageMap, 0, 0);
    //36.839118, -2.307429

    //center of the earth
    var centerLongitude = calculateX(0);
    var centerLatitude = calculateY(0);
    
    //The position in the screen is the difference between the point to the center
    //Draw a point in the map
    ellipse(calculateX(-2.307429) - centerLongitude, calculateY(36.839118) - centerLatitude, 10, 10);
}

function draw() {

}

/**
 * Calculate x coordinate according to the longitude. 
 * Returns pixels
 */
function calculateX(theLongitude) {
    //this formula asumes that longitude is coming in radians
    return (256 / pi) * (Math.pow(2, zoom)) * (toRadians(theLongitude) + pi);
}

function calculateY(theLatitude) {
    //this formula asumes that longitude is coming in radians
    return (256 / pi) * (Math.pow(2, zoom)) * (pi - Math.log(Math.tan((pi / 4) + (toRadians(theLatitude) / 2))));
}

/**
 * Converts degrees to radians.
 */
function toRadians(degrees) {
    return degrees * pi / 180;
}

