function detectDevice(){
  //if user is on mobile
  if (!!navigator.maxTouchPoints){
    window.alert("This is best viewed on desktop! \n Please view this on a desktop device");
  }
  //if user is on desktop
  else{
  }
}
detectDevice()

let dino = document.querySelector("#dino");
let background = document.querySelector(".backgroundContainer");
let allProjDiv = document.querySelector(".gifs");
let welcome = document.querySelector(".welcome");
let gif1 = document.querySelector("#gif-container1");
let gif2 = document.querySelector("#gif-container2");
let projArray = [gif1, gif2];
let instructions=document.getElementsByClassName('instructions')[0];
let held_directions = []; //State of which arrow keys we are holding down
let speed = 4; //How fast the character moves in pixels per frame
let x = 100;
let go= false;
let last;

let chat = document.getElementsByClassName("chat")[0];
let chat2 = document.getElementsByClassName("chat2")[0];


welcome.style.visibility="hidden";
// for (let i=0;i<10;i++){
//   projArray[i].style.visibility="hidden";
// }


document.addEventListener("DOMContentLoaded", function() {
  let backgroundImageChanged = false;
  
  document.addEventListener("keydown", function(event) {
    if (event.key === "ArrowRight" && !backgroundImageChanged) {
      document.getElementsByClassName("backgroundContainer")[0].style.background = "url('assets/bgg1.png')";
      document.getElementsByClassName("backgroundContainer")[0].style.backgroundSize = "100%";
      document.getElementsByClassName("backgroundContainer")[0].style.backgroundPosition = "bottom";
      document.getElementsByClassName("backgroundContainer")[0].style.backgroundRepeat = "no-repeat";
      backgroundImageChanged = true;
    }
  });
});




const moveCharacters = () => {
  var pixelSize = parseInt(
   getComputedStyle(document.documentElement).getPropertyValue('--pixel-size')
);
  const held_direction = held_directions[0];
     if (held_direction) {
        if (held_direction === directions.right) {x += speed;dino.style.transform = "scaleX(1)"}
        if (held_direction === directions.left) {x -= speed;dino.style.transform = "scaleX(-1)"}
     }

     // // Limits (gives the illusion of walls)
     var leftLimit = 90;
     var rightLimit = 1120;
     if (x < leftLimit) { x = leftLimit; }
     if (x > rightLimit) { x = rightLimit; }
    //  console.log("here i am", x);


     var camera_left = pixelSize * 66;
     var camera_top = pixelSize * 42;

     background.style.transform = `translate3d( ${-x*pixelSize+camera_left}px, 0, 0 )`;
};

const step = (posX, posY, player) => {
  moveCharacters();
  checkOverlapWelcome(dino,welcome);
  // for (let i=0;i<2;i++){
  //   checkOverlap(dino,projArray[i]);
  //   if (go == true){
  //     last = i;
  //     console.log(i);
  //   }
  // }
  checkOverlapGif1(dino,gif1);
  checkOverlapGif2(dino,gif2);


  if (last > -1){
    console.log("works");
    switch (last) {
      case 0:
        window.location.href='../projects/mini-proj-1/index.html'
        break;
      case 1:
        window.location.href='../projects/mini-proj-2/index.html'
        break;
    }
    return
  }
  window.requestAnimationFrame(() => {
    step(posX, posY, player);
  });
};
setTimeout(
    function() {
      instructions.style.visibility = "hidden";
      
    }, 5000);
step();
/* Direction key state */
const directions = {
  up: "up",
  down: "down",
  left: "left",
  right: "right",
};

const keys = {
  38: directions.up,
  37: directions.left,
  39: directions.right,
  40: directions.down,
};
document.addEventListener("keydown", (e) => {
  dino.classList.add("dinoAnimation");
  var dir = keys[e.which];
  if (dir && held_directions.indexOf(dir) === -1) {
    held_directions.unshift(dir);
  }
});

document.addEventListener("keyup", (e) => {
    dino.classList.remove("dinoAnimation");
  var dir = keys[e.which];
  var index = held_directions.indexOf(dir);
  if (index > -1) {
    lastKey = held_directions[index];
    held_directions.splice(index, 1);
  }
});

// function checkOverlap(a, b) {
//   var aRect = a.getBoundingClientRect();
//   var bRect = b.getBoundingClientRect();
//   if (!(aRect.right < bRect.left - 20)){
//     b.style.visibility = "visible";
//     instructions.innerHTML = "Press the ENTER key to talk!"
//     instructions.style.visibility = "visible";

//     // chat.style.visibility = "visible";


//     setTimeout(
//         function() {instructions.style.visibility = "hidden";}, 5000);
//     document.addEventListener("keydown", (e) => {
//       var code = (e.keyCode ? e.keyCode : e.which);
//       if(code == 13) {
//         go = true;
//       }
//     });

//   }
//   else{
//       b.style.visibility = "hidden";
//       chat.style.visibility = "visible";
//       go=false;
//   }
// }

function checkOverlapGif1(a, b) {
  var aRect = a.getBoundingClientRect();
  var bRect = b.getBoundingClientRect();
  var overlapThreshold = 20;

  if (aRect.right + overlapThreshold >= bRect.left && aRect.left - overlapThreshold <= bRect.right) {
    b.style.visibility = "visible";
    instructions.innerHTML = "Press the ENTER key to talk!";
    instructions.style.visibility = "visible";
    chat.style.visibility = "visible";


    setTimeout(function() {
      instructions.style.visibility = "hidden";
    }, 5000);

    // document.addEventListener("keydown", function(e) {
    //   if (e.key === "Enter") {
    //     go = true;
    //     console.log("hey")
    //   }
    // });
  } else {
    chat.style.visibility = "hidden";
    b.style.visibility = "hidden";
    chat.style.visibility = "hidden";
    go = false;
  }
}

function checkOverlapGif2(a, b) {
  var aRect = a.getBoundingClientRect();
  var bRect = b.getBoundingClientRect();
  var overlapThreshold = 20;

  if (aRect.right + overlapThreshold >= bRect.left && aRect.left - overlapThreshold <= bRect.right) {
    b.style.visibility = "visible";
    instructions.innerHTML = "Press the ENTER key to talk!";
    instructions.style.visibility = "visible";
    chat2.style.visibility = "visible";

    setTimeout(function() {
      instructions.style.visibility = "hidden";
    }, 5000);
  } else {
    chat2.style.visibility = "hidden";
    b.style.visibility = "hidden";
    chat2.style.visibility = "hidden";
    go = false;
  }
}


function checkOverlapWelcome(a,b){
  var aRect = a.getBoundingClientRect();
  var bRect = b.getBoundingClientRect();
  if (!(aRect.right < bRect.left)){
    b.style.visibility = "visible";
  }
  else{
      b.style.visibility = "hidden";
  }
}




  


let bot = new RiveScript();

const message_container = document.querySelector('.messages');
const message_container1 = document.querySelector('.messages1');
const form = document.querySelector('.actions');
const input_box = document.querySelector('.write');

bot.loadFile("brain.rive").then(botReady).catch(botNotReady);

form.addEventListener('submit', (e) => {
  e.preventDefault();
  selfReply(input_box.value);
  input_box.value = '';
});

function botReply(message){
  message_container.innerHTML = `<div class="bot">${message}</div>`;
  location.href = '#edge';
}

function selfReply(message){
  message_container1.innerHTML = `<div class="self">${message}</div>`;
  location.href = '#edge';
  console.log("gvhwdbjaks");
  
  bot.reply("local-user", message).then(function(reply) {
    botReply(reply);
  });
}

function botReady(){
  bot.sortReplies();
  botReply('oh you are here');
}

function botNotReady(err){
  console.log("An error has occurred.", err);
}









let bot2 = new RiveScript();

const message_container2 = document.querySelector('.messages2');
const message_container3 = document.querySelector('.messages3');
const form2 = document.querySelector('.actions2');
const input_box2 = document.querySelector('.write2');


bot2.loadFile("brain2.rive").then(botReady2).catch(botNotReady2);

form2.addEventListener('submit', (e) => {
  e.preventDefault();
  selfReply2(input_box2.value);
  input_box2.value = '';
});

function botReply2(message){
  message_container2.innerHTML = `<div class="bot2">${message}</div>`;
  location.href = '#edge2';
}

function selfReply2(message){
  message_container3.innerHTML = `<div class="self2">${message}</div>`;
  location.href = '#edge2';
  
  bot2.reply("local-user", message).then(function(reply) {
    botReply2(reply);
  });
}

function botReady2(){
  bot2.sortReplies();
  botReply2('oh nononon');
}

function botNotReady2(err){
  console.log("An error has occurred.", err);
}
