var canv = document.getElementById("piCanvas");
var c = canv.getContext("2d");
var w = canv.width;
c.clearRect(0, 0, w,w);
c.font = "30px sans-serif";

var incirc=0;
var total=0;
var rate =1 ;
function doPoint(){
    c.beginPath();
    x = Math.random()*w-w/2;
    y = Math.random()*w-w/2;
    sx = x+w/2;
    sy = y+w/2+30;
    d = Math.sqrt(x*x+y*y);
    if(d < w/2){
        c.fillStyle = "red";
        incirc++;
    } else {
        c.fillStyle = "blue";
    }
    total++;
    c.arc(sx,sy,2,0,2*Math.PI,false);
    c.fill();
    
    c.fillStyle = "black";
    
    c.clearRect(0,0,w,30);
    c.fillText("C="+incirc,0,28);
    c.fillText("S="+total,200,28);
    r = incirc/total;
    c.fillText("C/S="+r.toPrecision(4),380,28);
    r = r*4;
    c.fillText("4C/S="+r.toPrecision(5),600,28);
}
    

function animate() {
    requestAnimationFrame(animate);
    
    for(let i=0;i<rate;i++){
        doPoint();
    }
    
    rate = rate+0.01;
    if(rate>1000)rate=1000;
    
    
}

animate();
