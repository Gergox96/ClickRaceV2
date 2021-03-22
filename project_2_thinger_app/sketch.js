///////////replace 'thingerUsername' with your exact thinger user name
///////////replace 'led1' with the exact resource name you called your led
/////////// everything from 'authorization to the end of the parenthesis is the resources unique authorization code and is available in your API settings  
var url1 = 'https://api.thinger.io/v3/users/Gergox96/devices/esp8266/resources/led1?authorization=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJEYXNoYm9hcmRfMl9MRURzIiwidXNyIjoiR2VyZ294OTYifQ.zTq-HcqfX8k2bANe2zaJ1Bif-yWAu_67R0wPQ8Yjy8g';
///////////replace 'thingerUsername' with your exact thinger user name
///////////replace 'led2' with the exact resource name you called your led
/////////// everything from 'authorization to the end of the parenthesis is the resources unique authorization code and is available in your API settings  
var url2 = 'https://api.thinger.io/v3/users/Gergox96/devices/esp8266/resources/led2?authorization=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJEYXNoYm9hcmRfMl9MRURzIiwidXNyIjoiR2VyZ294OTYifQ.zTq-HcqfX8k2bANe2zaJ1Bif-yWAu_67R0wPQ8Yjy8g';

var thingerUrl = ["https://api.thinger.io/v3/users/Gergox96/devices/esp8266/resources/", "?authorization=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJEYXNoYm9hcmRfMl9MRURzIiwidXNyIjoiR2VyZ294OTYifQ.zTq-HcqfX8k2bANe2zaJ1Bif-yWAu_67R0wPQ8Yjy8g"]

var resources = ["led1", "led2", "stop", "forward", "backward", "stepfor", "stepback"];

////////// everything from 'Bearer to the end of the parenthes is your unique individual authorization code and is available in your thinger settings
var Auth = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJUZXN0d2l0aE5hdklEIiwidXNyIjoiR2VyZ294OTYifQ.W5DznqQKsq7Rumnv6pjTdvZDGZ70fh2tU-TKfNtfSLg";

////// variables for the 2 seperate data sets and the 2 seperate buttons
var data1;
var data2;
var ledButton1;
var ledButton2;
var servoStop;
var servoFor;
var servoBack;
var stepFor;
var stepBack;
var video;

var url = [];

function setup() {
    //// make the canvas whatever size you require
    createCanvas(windowWidth, windowHeight);
    
    video = createCapture(VIDEO);
    video.size(1900,500);
    video.position(width / 4 - 410, height / 4)

    /////// for loop that is iterating through all of 
    ////// the Thinger resource URL's. It combines two 
    ////// text strings and the resource together
    for (let i = 0; i < resources.length; i++) {
        url[i] = thingerUrl[0] + resources[i] + thingerUrl[1];
    };

//    ledButton1 = createButton('LED1')
//        .style('border', '2px solid yellow')
//        .position(width / 2 - 100, height / 6)
//        .mousePressed(ledOn1)
//        .mouseReleased(ledOff1)
//        .mouseOver(() => (ledButton1.style('background-color', "#ffffff")))
//        .mouseOut(() => (ledButton1.style('background-color', "#28d1d1")));
//
//    ledButton2 = createButton('LED2')
//        .style('border', '2px solid yellow')
//        .position(width / 2 + 100, height / 6)
//        .mousePressed(ledOn2)
//        .mouseReleased(ledOff2)
//        .mouseOver(() => (ledButton2.style('background-color', "#ffffff")))
//        .mouseOut(() => (ledButton2.style('background-color', "#28d1d1")));
    
    background(200,160,150);
    
    textSize(72);
    textFont('Magneto');
    text('Welcome to Click Race!', width / 2 - 400, height / 8);
    
    textSize(18);
    textFont('Arial');
    text('Place your bet on a colour below!', width / 2 - 200, height / 6 - 2);
    
    myButton1 = createButton('Blue');
    myButton1.mousePressed(drawText1);
    myButton1.position(width / 2 - 300, height / 5)
    myButton1.style('background-color:#0CAEF7');
    
    myButton2 = createButton('Red');
    myButton2.mousePressed(drawText2);
    myButton2.position(width / 2 - 150, height / 5)
    myButton2.style('background-color:red');
    
    myButton3 = createButton('Yellow');
    myButton3.mousePressed(drawText3);
    myButton3.position(width / 2, height / 5)
    myButton3.style('background-color:#F7D80C');
    
    myButton4 = createButton('Green');
    myButton4.mousePressed(drawText4);
    myButton4.position(width / 2 + 150, height / 5)
    myButton4.style('background-color:#00AE05');
    
    myButton5 = createButton('Erase Bet');
    myButton5.mousePressed(eraseBet);
    myButton5.position(width / 2 + 300, height / 5)
    myButton5.style('background-color:white');

    servoStop = createButton('STOP')
        .style('border', '2px solid red')
        .position(width / 2 - 150, height / 2 + 270)
        .mousePressed(servoStopT)
        .mouseReleased(servoStopF)
        .mouseOver(() => (servoStop.style('background-color', "#FF0000")))
        .mouseOut(() => (servoStop.style('background-color', "#fff")));

    servoFor = createButton('START')
        .style('border', '2px solid green')
        .position(width / 2 + 150, height / 2 + 270)
        .mousePressed(servoForT)
        .mouseReleased(servoForF)
        .mouseOver(() => (servoFor.style('background-color', "#00AE05")))
        .mouseOut(() => (servoFor.style('background-color', "#fff")));

    servoBack = createButton('RESET')
        .style('border', '2px solid yellow')
        .position(width / 2, height / 2 + 270)
        .mousePressed(servoBackT)
        .mouseReleased(servoBackF)
        .mouseOver(() => (servoBack.style('background-color', "#F7D80C")))
        .mouseOut(() => (servoBack.style('background-color', "#fff")));

//    stepFor = createButton('STEPFOR')
//        .style('border', '2px solid yellow')
//        .position(width / 2 + 100, height / 2 - 50)
//        .mousePressed(servoStepForT)
//        .mouseReleased(servoStepForF)
//        .mouseOver(() => (stepFor.style('background-color', "#ffffff")))
//        .mouseOut(() => (stepFor.style('background-color', "#28d1d1")));
//
//    stepBack = createButton('STEPBACK')
//        .style('border', '2px solid yellow')
//        .position(width / 2 - 100, height / 2 - 50)
//        .mousePressed(servoStepBkT)
//        .mouseReleased(servoStepBkF)
//        .mouseOver(() => (stepBack.style('background-color', "#ffffff")))
//        .mouseOut(() => (stepBack.style('background-color', "#28d1d1")));

///// some p5 button styling, this affects all the buttons
    let buttons = selectAll('button');
    for (let i = 0; i < buttons.length; i++) {
        buttons[i]
            .size(130, 30)
            .style('font-size', '20px')
//            .style('color', '#ffffff')
//            .style('background-color', "#777")
            .style('text-align', 'center')
            .style('transition-duration', '0.4s');
    }
}


function draw() {
    image(video);

}

////// these are the functions sending data to the switch case based
////// on the specific mousepressed, this doesnt feel optimizwed but it works
function ledOn1() {
    ////this sends a boolean state of false to the led1 json function
    sendData('ledOn1');
    ledButton1.style('border', '6px solid yellow');
}

function ledOff1() {
    ////this sends a boolean state of false to the led1 json function
    sendData('ledOff1');
    ledButton1.style('border', '2px solid yellow');
}

function ledOn2() {
    ////this sends a boolean state of true to the led2 json function 
    sendData('ledOn2');
    ledButton2.style('border', '10px solid yellow');
}

function ledOff2() {
    ////this sends a boolean state of false to the led2 json function
    sendData('ledOff2');
    ledButton2.style('border', '2px solid yellow');
}


function servoStopT() {
    ////this sends a boolean state of true to the led2 json function 
    sendData('servoStopT');
    servoStop.style('border', '10px solid yellow');
}

function servoStopF() {
    ////this sends a boolean state of false to the led2 json function
    sendData('servoStopF');
    servoStop.style('border', '2px solid yellow');
}

function servoForT() {
    ////this sends a boolean state of true to the led2 json function 
    sendData('servoForT');
    servoFor.style('border', '10px solid yellow');
}

function servoForF() {
    ////this sends a boolean state of false to the led2 json function
    sendData('servoForF');
    servoFor.style('border', '2px solid yellow');
}

function servoBackT() {
    ////this sends a boolean state of true to the led2 json function 
    sendData('servoBackT');
    servoBack.style('border', '10px solid yellow');
}

function servoBackF() {
    ////this sends a boolean state of false to the led2 json function
    sendData('servoBackF');
    servoBack.style('border', '2px solid yellow');
}

function servoStepForT() {
    ////this sends a boolean state of true to the led2 json function 
    sendData('servoStepForT');
    stepFor.style('border', '10px solid yellow');
}

function servoStepForF() {
    ////this sends a boolean state of false to the led2 json function
    sendData('servoStepForF');
    stepFor.style('border', '2px solid yellow');
}

function servoStepBkT() {
    ////this sends a boolean state of true to the led2 json function 
    sendData('servoStepBkT');
    stepBack.style('border', '10px solid yellow');
}

function servoStepBkF() {
    ////this sends a boolean state of false to the led2 json function
    sendData('servoStepBkF');
    stepBack.style('border', '2px solid yellow');
}

function drawText1() {
    textSize(18);
    textFont('Arial');
    fill(12,174,247);
    text('You bet on Blue!', width / 2 + 75, height / 6 - 2);
}

function drawText2() {
    textSize(18);
    textFont('Arial');
    fill(255,0,0);
    text('You bet on Red!', width / 2 + 75, height / 6 - 2);
}

function drawText3() {
    textSize(18);
    textFont('Arial');
    fill(255,255,0);
    text('You bet on Yellow!', width / 2 + 75, height / 6 - 2);
}

function drawText4() {
    textSize(18);
    textFont('Arial');
    fill(0,174,5);
    text('You bet on Green!', width / 2 + 75, height / 6 - 2);
}

function eraseBet() {
    fill (200,160,150);
    noStroke();
    rect (1032,142,150,25);
}


function sendData(val) {

    let urlData;
    switch (val) {
        case 'ledOn1':
            urlData = true;
            urli = url[0];
            break;
        case 'ledOff1':
            urlData = false;
            urli = url[0];
            break;
        case 'ledOn2':
            urlData = true;
            urli = url[1];
            break;
        case 'ledOff1':
            urlData = false;
            urli = url[1];
            break;
        case 'servoStopT':
            urlData = true;
            urli = url[2];
            break;
        case 'servoStopF':
            urlData = false;
            urli = url[2];
            break;
        case 'servoForT':
            urlData = true;
            urli = url[3];
            break;
        case 'servoForF':
            urlData = false;
            urli = url[3];
            break;
        case 'servoBackT':
            urlData = true;
            urli = url[4];
            break;
        case 'servoBackF':
            urlData = false;
            urli = url[4];
            break;
        case 'servoStepForT':
            urlData = true;
            urli = url[5];
            break;
        case 'servoStepForF':
            urlData = false;
            urli = url[5];
            break;
        case 'servoStepBkT':
            urlData = true;
            urli = url[6];
            break;
        case 'servoStepBkF':
            urlData = false;
            urli = url[6];
            break;
        default:
            urlData = false;

    }

    ////// this function sends the data boolean state for each resource 
    ////// to thinger.io using a json, it uses the switch case above
    ////// to change the authorization, the specific resource address,
    ////// and correct data type based on the case and the button pressed
    let postData = {
        method: "POST",
        Headers: {
            'Content-Type': "application/json;charset=UTF-8",
            'Authorization': Auth,
            'Accept': "application/json, text/plain, */*"
        },

        "in": urlData
    };
    httpPost(urli, 'application/json', postData, function (result) {
        console.log(postData);
    });
}
