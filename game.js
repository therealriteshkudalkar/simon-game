var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var gameStarted = false;
var gamePatternIndex = 0;

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function startGame() {
  setTimeout(function() {
    $(".container").show();
    $("#start").hide();
    startOver();
    if (!gameStarted) {
      gameStarted = true;
      nextSequence();
    }
  }, 500);
}

function startOver() {
  gamePattern = []; //console.log(failure);
  userClickedPattern = [];
  gamePatternIndex = 0;
  level = 0;
  gameStarted = false;
}

function nextSequence() {
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  //button animation from computer
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);

  //button sound from computer
  playSound(randomChosenColor);

  userClickedPattern = [];
  gamePatternIndex = 0;
}

$(".btn").click(function(event) {
  var userChosenColor = event.target.id; //console.log(event.target.id); or console.log(this.attr("id"));
  userClickedPattern.push(userChosenColor);

  //button sound on user click
  playSound(userChosenColor);

  //button animation on user click
  animatePress(userChosenColor);

  if(userChosenColor === gamePattern[gamePatternIndex]) {
    gamePatternIndex++; //console.log("success!");
    if(level === gamePatternIndex) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    $("h1").html("Game Over! <br><br>Press any key to restart or click on start. <br><br>Your score: " + (gamePattern.length - 1));
    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    $("#start").show();
    $(".container").hide();
  }
});

//Start Game
$(document).keydown(function(event) {
  startGame();
});
