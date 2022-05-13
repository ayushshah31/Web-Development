var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red","blue","green","yellow"];
var started = false;
var level = 0;

function randomNumberGenerator(){
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
            $("#"+currentColor).removeClass('pressed');
    }, 100);
}

$(document).keypress(function(){
    if(!started){
        $("#title").text("Level " + level);
        nextSequence();
        started = true;
    }
})

function nextSequence(){
    level++;
    $("#title").text("Level " + level);
    randomNumberGenerator();
}

$(".btn").click(function(){
    var userChosenColor = this.id;
    animatePress(this.id);
    playSound(userChosenColor);
    userClickedPattern.push(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
    // console.log(userClickedPattern);
});

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]==userClickedPattern[currentLevel]){
        console.log("success");
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
                userClickedPattern = [];
            }, 1000);
        }
    }
    else{
        console.log("wrong");
        $("body").addClass("game-over");
            setTimeout(function(){
                $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over! press any key to start");
        startOver();
    }
}

function startOver(){
    level=0;
    gamePattern=[];
    userClickedPattern = [];
    started = false;
}