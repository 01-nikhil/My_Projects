var buttonColors=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level=1;
function nextSequence()
{
    var randomnum=Math.floor(Math.random()*4);
    var randomcolor=buttonColors[randomnum];
    gamePattern.push(randomcolor);

    $("h1").text("Level "+level);
    level+=1;
    
    $('#'+randomcolor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomcolor);
    userClickedPattern=[];
}
$(document).keypress(function(){
    
    $("h1").text("Level "+level);
    nextSequence();
})
$(".btn").click(function(){
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);

    animate("#"+userChosenColour);
    playSound(userChosenColour);
    
    console.log(userClickedPattern);
    checkAnswer(userClickedPattern.length-1)
})
function animate(currentlevel)
{
    $(currentlevel).addClass("pressed");
    setTimeout(function(){
        $(currentlevel).removeClass("pressed")
    },100);

}
function checkAnswer(currentColour)
{
    if(userClickedPattern[currentColour]===gamePattern[currentColour])
    {
        if(userClickedPattern.length===gamePattern.length){

            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        $("h1").text("Game Lost!, Press any key");
        gamePattern=[];
        playSound("wrong");
        level=1;
    }

}



function playSound(randomcolor)
{
    var audio=new Audio("sounds/"+randomcolor+".mp3");
    audio.play();
}