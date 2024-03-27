let data;
let rm; // variable for the RiTa Markov Chain model
let letters = [];
let fonts = ['Arial', 'Verdana', 'Helvetica', 'Georgia', 'Times New Roman', 'Courier New', "fontRegular", "fontItalic", "fontBold"]; // Array of font names

let speechVoice;
function preload() {
  data = loadStrings("data.txt"); // load the data source into the variable
}

function setup() {
  createCanvas(windowWidth, windowHeight); // Create a canvas

  // Initialize p5.Speech object
  speechVoice = new p5.Speech();
  speechVoice.listVoices();
  speechVoice.setVoice("Samantha");

  rm = RiTa.markov(3); // create a Markov Chain. The higher the n value, the closer the result will be to the original data
  rm.addText(data); // add our data source into the Markov Chain model

  setInterval(createLetter, 300);
  setInterval(saySomething, 3000);
}

function createLetter() {
  let response = rm.generate({ seed: ["Linda-newly-found-species"] });
  let x = random(windowWidth - 800);
  let y = random(-100, -10); // Start letters above the canvas
  let size = random(20, 40); // Random text size between 10 and 30
  let font = random(fonts); // Randomly select a font from the array
  let letter = {
    text: response,
    x: x,
    y: y,
    size: size,
    speed: random(0.7, 5.5),
    font: font // Store the font name
  };
  letters.push(letter);
}

function saySomething() {
  let response = rm.generate({ seed: ["Linda-newly-found-species"] });
  speechVoice.speak(response);
}

function draw() {
  background(0);
  for (let i = 0; i < letters.length; i++) {
    let letter = letters[i];
    textSize(letter.size);
    fill(255,255,255); 
    textFont(letter.font);
    text(letter.text, letter.x, letter.y);

    letter.y += letter.speed;

    if (letter.y > height) {
      letters.splice(i, 1);
    }
  }
}
