let rnnModel;
let bttn;
let displayText;

function preload(){
  rnnModel = ml5.charRNN("https://raw.githubusercontent.com/ml5js/ml5-data-and-models/main/models/charRNN/hemingway");
}
function setup() {
  //createCanvas(400, 400);
  bttn = createButton("Generate");
  bttn.mousePressed(generateText);
}

function generateText(){
  let options = {
    seed: "The meaning of life is ",
    temperature: 0.5,
    length: 200
  }
  rnnModel.generate(options, gotText);
}

function gotText(err, result){
  console.log(err);
  console.log(result);
  displayText = "The meaning of life is " + result.sample;

//index of period
  let periodIndex = displayText.indexOf(".");
  if (periodIndex != -1){
    displayText = displayText.substring(0, periodIndex + 1) ;
  }
  createP(displayText);
}

function draw() {
  //background("blue");
}
