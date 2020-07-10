
// get the canvas and its drawing context 
var canv = document.getElementById("piCanvas");
var c = canv.getContext("2d");

// get just the width - we assume the canvas is square,
// except for a strip of 30 pixels at the top to draw text in.
var w = canv.width;

// clear it
c.clearRect(0, 0, w,w+30);

// and set up the font.
c.font = "30px sans-serif";

// initialise our counts
var C=0; // number of points in circle and square
var S=0; // number of points just in square (=number of points drawn)

// this controls the rate at which we add points - it gets faster as 
// we go along. It's actually the number of points added per frame
var rate =1 ;

// do a single point
function doPoint(){
    // start drawing a path
    c.beginPath();
    // create a point in the range -w to w in x and y
    x = Math.random()*w-w/2;
    y = Math.random()*w-w/2;
    // get the screen coords for that point
    sx = x+w/2;
    sy = y+w/2+30; // remember the strip along the top for text!
    
    // work out the distance from the centre
    d = Math.sqrt(x*x+y*y);
    // is it in the circle?
    if(d < w/2){
        // yes! draw in red and increment C
        c.fillStyle = "red";
        C++;
    } else {
        // no, just draw it in blue
        c.fillStyle = "blue";
    }
    // always increment S, the number of points in total
    S++;
    // draw the point as a tiny circle
    c.arc(sx,sy,2,0,2*Math.PI,false);
    c.fill();
    
    // draw the text along the top
    c.fillStyle = "black";
    c.clearRect(0,0,w,30);
    c.fillText("C="+C,0,28);
    c.fillText("S="+S,200,28);
    r = C/S;
    c.fillText("C/S="+r.toPrecision(4),380,28);
    r = r*4;
    c.fillText("4C/S="+r.toPrecision(5),600,28);
}
    

// does a single frame of animation
function animate() {
    // queue up the next frame
    requestAnimationFrame(animate);
    
    // do "rate" points
    for(let i=0;i<rate;i++){
        doPoint();
    }
    
    // slowly speed up
    rate = rate+0.01;
    // but don't go completely crazy
    if(rate>1000)rate=1000;
    
    
}

// queue up the first frame!
animate();
