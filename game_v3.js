var gamePattern = [];
var buttonColours = ["red","blue","green","yellow"];

var userClickedPattern = [];

var started = false; // oyunun başlayıp başlamadıgını tutuyor
var level = 0;
var flag = true;
$(document).keypress(function(){

  if (!started)
  {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }

});

$(".btn").on("click",function(){


  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);


  playSound(userChosenColour);
  animatePress(userChosenColour);


    if (userClickedPattern.length === (level)*(level+1)/2) // it's require for pass next level
    {
      flag = checkAnswer(level);
      if (flag){

        setTimeout(function (){
          nextSequence();
        }, 1000);

      }

      else
      {
        gameOver();
      }

    }

      else if(flag=checkAnswer2(level) )
      {
            flag = checkAnswer2(level);
      }

        else if (!flag)
        {
          gameOver();
        }

});

function gameOver()
{
  playSound("wrong");
  $("#level-title").text("Game Over, Press Any Key to Restart ");
  $("body").addClass("game-over"); // ben currentColour degiskenin bir renkten ziyade bir html element objesi olarak kullanmış oldum
  setTimeout(function(){
    $("body").removeClass("game-over");
  },200);

  started = false;
  level = 0;

}

function checkAnswer2(level)
{

    var t = ((level-1)*level)/2 // bir önceki userClickedPattern methodunun boyutu
    var up = (level*(level+1))/2 // mevcut size
    var m = 0;
    var size = userClickedPattern.length;

    while (t < up && t < size) //(t < up || m < level)
    {
      if (userClickedPattern[t] !== gamePattern[m] )
      {
          return false;

      }
      m++;
      t++;
    }
    return true;

}

function nextSequence(){
  level++;

  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];

  $("#" +randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  gamePattern.push(randomChosenColour);
  playSound(randomChosenColour);

}


function playSound(name){

  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


function animatePress(currentColour){ // bu fonksiyonu step4 te kullanayıroum
  $("#" + currentColour).addClass("pressed"); // ben currentColour degiskenin bir renkten ziyade bir html element objesi olarak kullanmış oldum
  setTimeout(function(){
    $("#" + currentColour).removeClass("pressed");
  },100);
}

function checkAnswer(level)
{
  var size = userClickedPattern.length;
  for (var i= size-1; i >= size-level; i--)
  { // compare first {level} items in gamePattern with last level items of userClickedPattern0

    if (gamePattern[(i+level)-size] !== userClickedPattern[i])
    {
      return false;
    }

  }
  return true;
}
