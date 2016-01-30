window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();
var timer = 0;
var speed = 3;
var c = document.getElementById("c");
var ctx = c.getContext("2d");
var textbox = document.getElementById("textbox");
var imagedata = ctx.getImageData(0,0,c.width,c.height);

function Check(e) {
    var keyCode = (e.keyCode ? e.keyCode : e.which);
    if (keyCode == 13) {
        e.preventDefault();
    }
}
//making the canvas full screen
c.height = window.innerHeight;
c.width = document.body.clientWidth;


document.getElementById("textbox").innerHTML = "❆✵⛄";
//characters characters - taken from the unicode charset
var characters = "0123456789-+-+==XX-+-+==XX";
//converting the string into an array of single characters
characters = characters.split("");
var col = document.getElementById("colo");
col.innerHTML = "#0f0";
var columns = c.width * 100 / c.width; //number of columns for the rain
//an array of drops - one per column
var drops = [];
//x below is the x coordinate
//1 = y co-ordinate of the drop(same for every drop initially)
for (var x = 0; x < columns; x++)
    drops[x] = {
        y: 1,
        size: Math.random() * 15 + 5,
        x: Math.random() * c.width
};

//drawing the characters

function draw() {
    ctx.clearRect(0,0,c.width,c.height);
    ctx.putImageData(imagedata,0,0);
    //Black BG for the canvas
    //translucent BG to show trail
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.fillStyle =/* "'"+*/col.innerHTML;//"'" //green text

    //looping over drops
    for (var i = 0; i < drops.length; i++) {
        ctx.font = drops[i].size + "px Times";
        //a random characters character to print
        if (textbox.innerHTML == "") {
            characters = textbox.innerHTML + " ";
        } else {
            characters = textbox.innerHTML;
        }

        var text = characters[Math.floor(Math.random() * characters.length)];
        //x = i*font_size, y = value of drops[i]*font_size
        ctx.fillText(text, drops[i].x, drops[i].y * drops[i].size);

        //sending the drop back to the top randomly after it has crossed the screen
        //adding a randomness to the reset to make the drops scattered on the Y axis
        if (drops[i].y * drops[i].size > c.height && Math.random() > 0.975) {
            drops[i].y = 0;
            drops.x = Math.random() * c.width;
        }
        //incrementing Y coordinate
        drops[i].y++;
    }
    imagedata = ctx.getImageData(0,0,c.width,c.height);
    
}
for (var i = 0; i < 100; i++) {
    draw();
}
(function animloop(){
  requestAnimFrame(animloop);
  timer++;
  if(timer == speed){
    draw();
    timer = 0;  
  }
})();