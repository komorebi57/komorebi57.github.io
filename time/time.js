var cx, cy; //integer
var secondsRadius; //decimal
var minutesRadius;
var hoursRadius;
var clockDiameter;
var weatherRadius;
var weather;
var weatherType;

function preload() {
  weather = loadJSON("http://api.openweathermap.org/data/2.5/weather?q=Seoul&units=metric&APPID=28a6192c157b2c01ffd0f19399f8d62b");
}

function setup() {
  weatherType = weather.weather[0].id;
  createCanvas(500, 500);
  
  var radius = min(width, height) / 2;
  smooth();

  rectMode(CENTER); // show bounding boxes
  stroke(12, 134, 58);
 
   arc(35, 35, 50, 50, 0, PI * 2.0); // lower quarter circle 
  secondsRadius = radius * 0.8;
  minutesRadius = radius * 1.3;
  hoursRadius = radius * 1.8;
  weatherRadius = radius * 0.3;
  
  cx = width / 2;
  cy = height / 2;
 
}

function draw() {
  background(0);
  
  // Draw the clock background
  fill(100, 150, 300);
  noStroke();
  
  // Angles for sin() and cos() start at 3 o'clock;
  // subtract HALF_PI to make them start at the top
  var s = map(second(), 0, 60, 0, TWO_PI) - HALF_PI;
  var m = map(minute() + norm(second(), 0, 60), 0, 60, 0, TWO_PI) - HALF_PI; 
  var h = map(hour() + norm(minute(), 0, 60), 0, 24, 0, TWO_PI * 2) - HALF_PI;
  
  noFill();
  strokeWeight(10);
  stroke(100, 300, 100);
  arc(cx, cy, hoursRadius, hoursRadius, -HALF_PI, h);
  stroke(220, 300, 100);
  arc(cx, cy, minutesRadius, minutesRadius, -HALF_PI, m);
  stroke(120, 200, 300);
  arc(cx, cy, secondsRadius, secondsRadius, -HALF_PI, s);
  
  noStroke();
  //console.log(weatherType)
  var weahterColor;
  if(500 <= weatherType && weatherType <= 531) {
    weahterColor = [85, 45, 255];//rain
  } else if(600 <= weatherType && weatherType <= 622) {
    weahterColor = [187, 187, 187];//snow
  } else if(801 <= weatherType && weatherType <= 804) {
    weahterColor = [43, 123, 169];//cloud
  } else if(700 <= weatherType && weatherType <= 781) {
    weahterColor = [126, 147, 225, 120];//fog
  } else if(800 <= weatherType && weatherType <= 800) {
    weahterColor = [0, 234, 255];//sun
  }else if(300 <= weatherType && weatherType <= 321) {
    weahterColor = [191, 250, 255];//Drizzle
  }
  
  fill(weahterColor[0], weahterColor[1], weahterColor[2]);
  arc(cx, cy, weatherRadius, weatherRadius, 0, PI * 2);
}