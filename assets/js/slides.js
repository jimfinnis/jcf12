var slidesets={}


function Slides(id,slides,slidecaptions) {
    this.id=id
    this.curslide = 0
    this.slides = slides
    this.slidecaptions = slidecaptions
}

Slides.prototype.next = function() {
    fig = document.getElementById(this.id)
    img = fig.getElementsByClassName("slideimg")[0]
    cap = fig.getElementsByClassName("slidecap")[0]
    ct = fig.getElementsByClassName("slidect")[0]
    
    img.src=this.slides[this.curslide]
    
    var t = (this.curslide+1)+" of "+(this.slides.length)
    ct.innerHTML = "Slide "+t+" (click to advance)"
    
    cap.innerHTML=this.slidecaptions[this.curslide]
    this.curslide=this.curslide+1
    if(this.curslide==this.slides.length){
        this.curslide=0
    }
}

    
