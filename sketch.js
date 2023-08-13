//declare all your variables in the global scope
let playButton; // to play the sounds
let myFont; //helvetica-adjacent typeface to mimic the language of the subway
let textArray1 = []; //store the x & y positions of all the points along the curves in the text
let volar = [];
let index = 0;
let r = 0; //
let audioDropdown;
let selectedOption;
let dings, announcement,crowd, siren, performance;
const selectedAudio = []; //the variable that stores the audio
const defaultText = "Type the first letter of your first name..."; //to receive text input from the user 
let xPosSlider; //to manipulate the x position of the where the inputted text will appear
let yPosSlider; //to manipulate the y position of the where the inputted text will appear
const size = 500; //the font size
let colorDropdown; // the variable that will store the series of colors that the background can be changed into
// const palette = ['#EE352E', '#00933C', '#0039A6', '#FCCC0A', '#FF6319', '#A7A9AC', '#996633', '#6CBE45'];
const palette = ['#000000', '#FFFFFF'];
let saveButton;
let selectedColor;
let offset;
let vol;
function preload() {
dings = loadSound("dings.mp3");
announcement = loadSound("announcement.mp3");
crowd = loadSound("crowd.mp3");
siren = loadSound("siren.mp3");
performance = loadSound("performance.mp3");
selectedAudio.push(dings, announcement, crowd, siren, performance);
myFont = loadFont('Helvetica.otf');
}

function setup() {
  createCanvas(1200, 800); //set the bounds of the canvas to the postcard dimensions
  textAlign(CENTER, CENTER); //make sure the co-ordinates of the text are at the center not at the top-left
  // angleMode(DEGREES);
  // frameRate(10);
  //create a button that will control the play and pause states of the audio stored in variable 'selectedAudio'
  playButton = createButton('  ▶ '); 
  playButton.mousePressed(toggleSong); //callback function that will be accessed the minute the mouse is pressed
  playButton.position(width-100, height+20); 
  playButton.size(45,45);
  playButton.class("myButton"); //adding style to an html element requires assigning it a class so that the css can point to it and decorate it however
  textFont(myFont); 

  // textSize(64);
  saveButton = createButton('Take Snapshot');
  saveButton.position(width, height+20);
  saveButton.addClass("saveButton");
  saveButton.mousePressed(takeSnapshot);
  
  let dropButton = createButton('Pick a sound');
  dropButton.position(width/2-100, height+80);
  dropButton.addClass("Instruction");
  
  audioDropdown = createSelect();
  audioDropdown.position(width/2-100, height+20);
  audioDropdown.option("dings", 1);
  audioDropdown.option("announcement", 2);
  audioDropdown.option("crowd", 3);
  audioDropdown.option("siren", 4);
  audioDropdown.option("performance", 5);
  audioDropdown.class("dropdown"); 
  audioDropdown.changed(updateAudio); // Call the updateAudio function when the dropdown selection changes

  let textButton = createButton('Enter intials');
  textButton.position(width/2-300, height+80);
  textButton.addClass("Instruction");

  let input = createInput();
  input.position(width/2-300, height+20);
  input.style("height","40px");
  input.changed(updateText); //callback function that will keep reading the input dialog box to see if there is new information
  input.class("dropdown");
  // music1.loop();
  // selectedAudio = new p5.Amplitude();
  // selectedAudio.setInput(music1);
  let subButton = createButton('Pick a random color');
  subButton.position(width/2+100, height+80);
  subButton.addClass("Instruction");
  colorDropdown = createSelect(colorToHex); //the DOM element that allows you to choose one option from a range of available options, in this case the color of the background
  colorDropdown.position(width/2+100, height+20);
  colorDropdown.option("Red");
  colorDropdown.option("Green");
  colorDropdown.option("Blue");
  colorDropdown.option("Yellow");
  colorDropdown.option("Orange");
  colorDropdown.option("Gray");
  colorDropdown.option("Brown");
  colorDropdown.option("Lime");
  colorDropdown.option("Purple");
  colorDropdown.class("dropdown");
  colorDropdown.changed(updateTextColor); //if the option that was initially selected changes, then the .changed operator calls the function to deal with it
  
  //   saveButton = createButton("Save");
  // saveButton.position(20, 120);
  // saveButton.mousePressed(saveCanvas);
  
  // size = createSlider(50,1000, 300);
  // size.position(20,150);
  let radButton = createButton('Pick a mode');
  radButton.position(width/2+300, height+80);
  radButton.addClass("Instruction");
  radio = createRadio();
  radio.position(width/2+300, height + 18);
  radio.option(1);
  radio.option(2);
  radio.option(3);
  radio.option(4);
  radio.class("myRadio");
  amp = new p5.Amplitude(); //initialize amp object with the library that deals with analysing amplitude 
}

function takeSnapshot() {
  saveCanvas('snapshot', 'png'); // Save the canvas as a PNG image with the filename "snapshot.png"
}

function updateText() {
  inputText = this.value(); //the variable inputText was created to store whatever the dialog box receives;
  textArray1 = myFont.textToPoints(inputText, width/2-330, height-230, size, {
    sampleFactor: 0.1,
  
  });
}

function updateTextPosition() {
  textArray1 = myFont.textToPoints(inputText, width/2-330, height-230, size, { //
    sampleFactor: 0.1,
  });
}

function updateAudio() {
  selectedOption = audioDropdown.value();
  // Stop all currently playing sounds
  for (let i = 0; i < selectedAudio.length; i++) {
    if (selectedAudio[i] && selectedAudio[i].isPlaying()) {
      selectedAudio[i].stop();
    }
  }
 
  // Load and play the selected sound
  switch (selectedOption) {
    case "1":
      return index = 0;
    
    case "2":
      return index = 1;
    
    case "3":
      return index = 2;
  
    case "4":
      return index = 3;
      
    case "5":
      return index = 4;

    // default:
     
    //   return selectedAudio[0];
  }


}


function updateTextColor() {
  let selectedColor = colorToHex(colorDropdown.value());
  let colorHex = colorToHex(selectedColor);
  stroke(colorHex);
}

function colorToHex(colorName) {
  switch (colorName) {
    case "Red":
      return "#EE352E";
    case "Green":
      return "#00933C";
    case "Blue":
      return "#0039A6";
    case "Yellow":
      return "#FCCC0A";
    case "Orange":
      return "#FF6319";
    case "Gray":
      return "#A7A9AC";
    case "Brown":
      return "#996633";
    case "Lime":
      return "#6CBE45";
    case "Purple":
      return "#B933AD";
    default:
      return "#6CBE45";
  }
}

function toggleSong() {
  selectedOption = audioDropdown.value();
    if (selectedAudio[index].isPlaying()) {
      selectedAudio[index].pause();
      playButton.html('| |');
    } else 
      selectedAudio[index].play();
      playButton.html('▶');
  }

function makeMonster(){
  noFill();

 for(let i = 0; i < textArray1.length;i++){

    push();
    stroke(palette[Math.floor(Math.random()*palette.length)]);
    strokeWeight(5);
  translate(textArray1[i].x, textArray1[i].y);
  rotate(r);
    // r = r+noise(1);
    r++;
    // bezier(-20, -20,30,20+offset,10,10, 20, 20);
    bezier(-20, -20,30,offset,10,10, 20, 20);
    pop();
}

}

function makeHairlines(){
  beginShape();
  for (let i = 0; i < textArray1.length; i++) {
 let colorValue = map(i, 0, textArray1.length, 290, 260); // map the index of the position to a color value
 stroke(palette[Math.floor(Math.random()*palette.length)]);
    push();
    noFill();
    stroke(palette[Math.floor(Math.random()*palette.length)]);
    strokeWeight(5);
    translate(textArray1[i].x, textArray1[i].y);
    rotate(220);
      // r++;
    line( 5, 5, 15, 15+3*(-offset)/2);
    pop();
  }
}

function makeChaos(){
for(let i = 0; i < textArray1.length;i++){
push();
noFill();
stroke(palette[Math.floor(Math.random()*palette.length)]);
strokeWeight(5);
translate(textArray1[i].x, textArray1[i].y);
rotate(r);
r++;
bezier(-20, -20,offset,offset,20,20, 20, 20);
pop();
}
}

function makeJitters(){
  for (let i = 0; i < textArray1.length; i++) {
    push();
    strokeWeight(5);
    stroke(palette[Math.floor(Math.random()*palette.length)]);
    translate(textArray1[i].x, textArray1[i].y);
    rotate(r);
    r++;
    line(-10, -10, 10, 10);
    pop();
}
}

function backCover(){
  push()
  translate(width/2,height/2)
  beginShape()
  for(let i = 0; i<360; i++){
   let a = map(volar[i], 0,1, 300,800)
    let x = a * cos(i);
    let y = a * sin(i);
noStroke();
fill(palette[Math.floor(Math.random()*palette.length)]);
circle(x, y,10);
// line(x,y,x+20,y+20)
// vertex(x, y);
  }
  endShape();
if(volar.length>360) {
  volar.splice(0,1)
}
pop();
}

function draw() {
selectedColor = colorDropdown.value();
background(selectedColor);
vol = amp.getLevel(); //a variable that stores the amplitude values of the playing audio
volar.push(vol);
offset = map(vol,0,1,20,500);
let val = radio.value();
backCover();
if (val == 1) {
  makeChaos();
}
if (val == 2) {
  makeMonster();
}
if (val == 3) {
  makeHairlines();
}
if (val == 4) {
  makeJitters();
}
}

