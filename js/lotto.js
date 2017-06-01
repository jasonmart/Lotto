/*  This is a lottery number generator written in javascript by Jason Martinez.
    Basically what I wanted to do was create a set of numbers based on the
    games PowerBall and MegaMillions and draw from that pool, deleting the
    numbers as they are selected.  In this way the game is a model of a real
    world drawings and avoids issues like drawing the same number twice.
*/

// Sets the the highest number ball for each game type.
const megaWhite = 75;
const megaSpecial = 15;
const powerWhite = 69;
const powerSpecial = 26;

// Selects game type

var gt = 0;

function main(game) {
  if (game == 1) {  //Check to see if the game is PowerBall
    gt = 1;
    $("#gametype").text("Playing POWERBALL");
    $("#power").addClass("selected");
    $("#mega").removeClass("selected");
    $(".single-numbers:nth-child(6)").addClass("power");
    $(".single-numbers:nth-child(6)").removeClass("mega");
    play(); //Plays the game type selected.
  } else if (game == 2) {  //Check to see if the game is Mega Millions
    gt = 2;
    $("#gametype").text("Playing MEGA MILLIONS");
    $("#mega").addClass("selected");
    $("#power").removeClass("selected");
    $(".single-numbers:nth-child(6)").addClass("mega");
    $(".single-numbers:nth-child(6)").removeClass("power");
    play(); //Plays the game type selected.
  } else {  //The game has not been selected
    gt = 0;
  }
};

// Draws the numbers

function play() {
  // Determine game type and set up the ball pool
  if (gt == 0) {
    $("#gametype").text("The game type has not been selected");
  } else if (gt == 1) {
    populate(powerWhite, powerSpecial);
  } else if (gt == 2) {
    populate(megaWhite, megaSpecial);
  }
}

// Populates the arrays that represent the set of balls

function populate(maxWhite, maxSpecial) {
  var popWhite = [];
  var popSpecial = [];
  var index = 1;
  while (index <= maxWhite) {
    popWhite.push(index);
    index++;
  }
  index = 1;
  while (index <= maxSpecial) {
    popSpecial.push(index);
    index++;
  }
  draw(popWhite, popSpecial);
}

// Drawing function

function draw(popWhite, popSpecial) {
  var whiteArray = [];
  var specialArray = [];
  for (i = 0; i < 5; i++) {
    var index_draw = Math.floor(Math.random() * popWhite.length);
    whiteArray.push(popWhite[index_draw]);
    popWhite.splice(index_draw, 1);
  }
  whiteArray.sort(sortfunction);
  var index_draw = Math.floor(Math.random() * popSpecial.length);
  specialArray.push(popSpecial[index_draw]);
  whiteArray.push(specialArray);
  // Adds the numbers to the list items.
  var b = 0;
  var c = 1;
  while (b < 5) {
    $(".single-numbers:nth-child(" + c + ")").text(whiteArray[b]);
    $(".single-numbers:nth-child(6)").text(specialArray[0]);
    b++;
    c++;
  }
}

//Sort function
function sortfunction(a, b) {
  return (a - b); //causes an array to be sorted numerically and ascending
};


// Loads script when page is ready

$(document).ready(main);
