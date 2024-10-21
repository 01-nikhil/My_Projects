// alert("hello");

 var numberofkeys=document.querySelectorAll(".drum");

 for(var i=0;i<numberofkeys.length;i++){
    numberofkeys[i].addEventListener("click",function(){
    handlesSound(this.innerHTML);
    animation(this.innerHTML)
 });
}

 document.addEventListener("keydown",function(event){
        handlesSound(event.key)
        animation(event.key)
 });


function handlesSound(key)
{
    switch(key){

    case 'w':
    var audio= new Audio("sounds/tom-1.mp3");
    audio.play();
    break;
    
    case 'a':
        var audio= new Audio("sounds/tom-2.mp3");
        audio.play();
        break;
    case 's':
        var audio= new Audio("sounds/tom-3.mp3");
        audio.play();
        break;
    case 'd':
        var audio= new Audio("sounds/tom-4.mp3");
        audio.play();
        break;
    case 'j':
        var audio2= new Audio("sounds/crash.mp3");
        audio2.play();
        break;
    case 'k':
        var audio2= new Audio("sounds/kick-bass.mp3");
        audio2.play();
        break;
    case 'l':
        var audio2= new Audio("sounds/snare.mp3");
        audio2.play();
        break;

    


    }
}

function animation(currentbutton)
{
    var button=document.querySelector("."+currentbutton);

    button.classList.add("pressed");
    button.classList.add("red");
    document.body.classList.add("shake");
    
    setTimeout(function(){
        document.body.classList.remove("shake");
        button.classList.remove("red");
            button.classList.remove("pressed")},500
    );
}