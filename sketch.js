//Variables for Pigeon
var Pig1;
var Pig2;
var PigRev1;
var PigRev2;
var pigStep = false;
var pigX = 3;
var pigY = 400;
var pigDirection = 'right';
var PigFly;
var PigFly2;
var City;

//variables for arduino
var serial;
var portName = "COM5";
var sensorValue;

var inmessage = [0, 0, 0, 0];
var oldmessate = [0, 0, 0, 0];

// Variables for Rectangles
var rectX = 600;
var rectY = 300;
var rectW = 400;
var rectH = 10;

var rectX2 = 0;
var rectY2 = 150;
var rectW2 = 400;
var rectH2 = 10;


var rectX3 = 600;
var rectY3 = 100;
var rectW3 = 400;
var rectH3 = 10;

//Pigeon images
function preload() {
    Pig1 = loadImage("pigeon1.png");
    Pig2 = loadImage("Pigeon2.png");
    PigRev1 = loadImage("PigeonLeft1.png");
    PigRev2 = loadImage("PigeonLeft2.png");
    PigFly = loadImage("fly.png");
    PigFly2 = loadImage("fly2.png");
    City = loadImage("city.png");
}

// canvas
function setup() {
    createCanvas(1000, 500);


    serial = new p5.SerialPort();
    serial.on('connected', serverConnected);
    serial.on('open', portOpen);
    serial.on('data', serialEvent);
    serial.on('error', serialError);
    serial.on('close', portClose);

    serial.open(portName);
}

function serverConnected() {
    console.log('connected to server.');
}

function portOpen() {
    console.log('the serial port opened.')
}

function portClose() {
    console.log('The serial port closed.');
}

function serialError() {
    console.log("error");
}

function serialEvent() {
    var currentString = serial.readLine(); // read the incoming string
    trim(currentString); // remove any trailing whitespace
    if (!currentString) {
        return; // if the string is empty, do no more
    }
    inmessage = split(currentString, '&')
//    sensorValue = currentString; // save it for the draw method
}

//background
function draw() {
    background(City);


    // Platforms

    // Rect 1
    rect(rectX, rectY, rectW, rectH);

    if (pigX > rectX && pigX < rectX + rectW && pigY + 100 > rectY && pigY + 100 < rectY + rectH) {
        pigY = 205;
        fill('red');
        text('Good Young Pigeon continue to climb! Climb to the top with those amazing flight animations!', 400, 200);
        console.log(pigY)
    }


    // Rect 2
    rect(rectX2, rectY2, rectW2, rectH2);

    if (pigX > rectX2 && pigX < rectX2 + rectW2 && pigY + 100 > rectY2 && pigY + 100 < rectY2 + rectH2) {
        pigY = 55;
        console.log(pigY)
        fill('yellow');
        text('You Are Learning Very Fast Young Pigeon!                                                                                                 Maybe because of this great game development!', 20, 50);
    }


    // Rect 3
    rect(rectX3, rectY3, rectW3, rectH3);

    if (pigX > rectX3 && pigX < rectX3 + rectW3 && pigY + 100 > rectY3 && pigY + 100 < rectY3 + rectH3) {
        pigY = 6;
//        console.log(pigY)
        fill('green');
        text('You Are Now Ready to Search for Crumbs! Tutorial Complete! Feel free to roam the "map".', 200, 50);
    }



    //walking function
    // Framecount
    if (frameCount % 5 == 0) {
        pigStep = !pigStep;
    }

    // Pigeon Direction Right
    if (pigDirection == 'right') {

        if (pigStep) {
            image(Pig1, pigX, pigY, 100, 100);
        } else {
            image(Pig2, pigX, pigY, 100, 100);
        }



        // Pigeon Direction Left
    } else if (pigDirection == 'left') {
        if (pigStep) {
            image(PigRev1, pigX, pigY, 100, 100);
        } else {
            image(PigRev2, pigX, pigY, 100, 100);
        }



        // Pigeon Direction Up
    } else if (pigDirection == 'up') {

        if (pigStep) {
            image(PigFly, pigX, pigY, 100, 100);
        } else {
            image(PigFly2, pigX, pigY, 100, 100);
        }



        // Pigeon Direction Down
    } else if (pigDirection == 'down') {

        if (pigStep) {
            image(PigFly2, pigX, pigY, 100, 100);
        } else {
            image(PigFly, pigX, pigY, 100, 100);
        }

    }

    // When Pigeon is standing still
    else {
        image(Pig1, pigX, pigY, 100, 100);
    }




    // When right key is pressed
    if (inmessage[0] == 1) {
        pigX = pigX + 3;
        pigDirection = 'right';
    } else if (inmessage[1] == 1) {
        pigX = pigX - 3;
        pigDirection = 'left';
    } else if (inmessage[2] == 1) {
        pigY = pigY - 3;
        pigDirection = 'up';
    } else if (inmessage[3] == 1) {
        pigY = pigY + 3;
        pigDirection = 'down';
    } else {
         pigDirection = 'none';
    }

//    if (keyCode == RIGHT_ARROW && keyIsPressed) {
//
//        pigX = pigX + 3;
//        pigDirection = 'right';
//
//
//        // When left key is pressed
//    } else if (keyCode == LEFT_ARROW && keyIsPressed) {
//
//        pigX = pigX - 3;
//        pigDirection = 'left';
//
//
//        // When up key is pressed
//    } else if (keyCode == UP_ARROW && keyIsPressed) {
//
//        pigY = pigY - 3;
//        pigDirection = 'up';
//
//
//        // When down key is pressed
//    } else if (keyCode == DOWN_ARROW && keyIsPressed) {
//
//        pigY = pigY + 3;
//        pigDirection = 'down';
//
//        // When nothing is pressed
//    } else {
////        pigDirection = 'none';
//    }
}
