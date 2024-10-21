// document.querySelector("h1").innerHTML="Hello";
var images=[
    {src:'dice1.png',value:1},
    {src:'dice2.png',value:2},
    {src:'dice3.png',value:3},
    {src:'dice4.png',value:4},
    {src:'dice5.png',value:5},
    {src:'dice6.png',value:6},
];
function random()
{
    const kutta=document.querySelectorAll("#change");

    function getval(){
    const number=Math.floor(Math.random()*images.length);
    return images[number];
    }

    const first=getval();
    const second=getval();

    document.getElementById("img1").setAttribute('src','./images/'+first.src);
    // document.getElementById("img1").setAttribute('data-value',first.value);
    
    document.getElementById("img2").setAttribute('src','./images/'+second.src);
    // document.getElementById("img2").setAttribute('data-value',second.value);

    if(first.value>second.value)
    {
        document.getElementById("heading").textContent="Player1 WINS!"
    }
    else if(second.value>first.value)
        {
        document.getElementById("heading").textContent="Player2 WINS!"
        
    }
    else{
        document.getElementById("heading").textContent="IT'S A TIE!"
    }
}
window.onload=random;
