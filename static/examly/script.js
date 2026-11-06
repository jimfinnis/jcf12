

const canvas = document.getElementById("canv");
const ctx = canvas.getContext("2d");

const SUBQWIDTH = 100
const PARTWIDTH = 70
const PARTGAP = 10
const ROW_HEIGHT = 100

function init(){
    ctx.fillStyle="black"
	ctx.fillRect(0,0,canvas.width,canvas.height)

}

function drawTextCent(x,y,str,col,size){
	ctx.font = (size||30)+"px arial"
	m = ctx.measureText(str)
	x = x-m.width/2
	ctx.fillStyle = col
	ctx.lineWidth = 2
	ctx.fillText(str,x,y)
}

// Draws one markable box: a label above, and a given/available box below,
// coloured according to whether it's the selected leaf and/or whether its
// row is the currently selected question.
function drawBox(ctx,x,y,width,label,given,marks,selected,qselected,labelSize){
	var tcol=(qselected&&selected) ? "white" : "lightgrey"
	drawTextCent(x+width/2,y,label,tcol,labelSize)

	ctx.strokeStyle="#d0d0d0"
	ctx.lineWidth=4
	ctx.strokeRect(x,y+10,width,50)
	if(given==0){
		ctx.fillStyle=qselected?"grey":"black"
	} else {
		ctx.fillStyle=qselected?"green":"darkgreen"
	}
	ctx.fillRect(x,y+10,width,50)

	drawTextCent(x+width/2,y+45,given+"/"+marks,tcol,labelSize)
}

class Part {
	constructor(numeral, marks){
		this.numeral = numeral
		this.marks = marks
		this.marksGiven = 0
	}
}

class SubQuestion {
	constructor(letter, marks, parts){
		this.letter = letter
		this.parts = (parts && parts.length) ? parts : null
		this.marks = marks
		this.marksGiven = 0
		this.selPart = 0
	}

	hasParts(){
		return this.parts !== null
	}

	totalMarks(){
		return this.hasParts() ? this.parts.reduce((s,p) => s+p.marks, 0) : this.marks
	}

	totalGiven(){
		return this.hasParts() ? this.parts.reduce((s,p) => s+p.marksGiven, 0) : this.marksGiven
	}

	setMark(mark){
		if(this.hasParts()){
			var p = this.parts[this.selPart]
			if(mark<=p.marks) p.marksGiven = mark
		} else {
			if(mark<=this.marks) this.marksGiven = mark
		}
	}

	// Move the selected part by d, wrapping within this sub-question's parts.
	// Returns false (leaving the selection at the boundary) if this sub-question
	// has no parts, or d would move past its last part - either way the caller
	// should advance to the next/previous sub-question instead.
	movePart(d){
		if(!this.hasParts()) return false
		this.selPart += d
		if(this.selPart<0) this.selPart = this.parts.length-1
		if(this.selPart>=this.parts.length){
			this.selPart = 0
			return false
		}
		return true
	}

	// Total width this sub-question occupies in its question's row: one box
	// per part if it has them, otherwise a single box.
	width(){
		return this.hasParts() ? this.parts.length*(PARTWIDTH+PARTGAP)-PARTGAP : SUBQWIDTH
	}

	draw(ctx,x,y,selected,qselected) {
		if(this.hasParts()){
			for(var i in this.parts){
				var p = this.parts[i]
				var px = x + i*(PARTWIDTH+PARTGAP)
				var label = this.letter+"("+p.numeral+")"
				drawBox(ctx,px,y,PARTWIDTH,label,p.marksGiven,p.marks,selected&&i==this.selPart,qselected,20)
			}
		} else {
			drawBox(ctx,x,y,SUBQWIDTH,this.letter,this.marksGiven,this.marks,selected,qselected,30)
		}
	}
}

class Question {
	constructor(qnum, subqs) {
		this.qnum = qnum
		this.subqs = subqs
		this.selSQ = 0
	}

	setMark(mark){
		var sq = this.subqs[this.selSQ]
		sq.setMark(mark)
	}

	// Select sub-question idx, entering it from direction d (d>0 selects its
	// first part, d<0 its last part, if it has parts).
	enterSQ(idx, d){
		this.selSQ = idx
		var sq = this.subqs[idx]
		if(sq.hasParts()) sq.selPart = (d>0) ? 0 : sq.parts.length-1
	}

	selectFirstSQ(){
		this.enterSQ(0, 1)
	}

	selectLastSQ(){
		this.enterSQ(this.subqs.length-1, -1)
	}

	// Move the selected leaf (a part, if the current sub-question has one,
	// otherwise the sub-question itself) by d. Returns false if d moves past
	// the last sub-question, so the caller should advance to the next question.
	moveLeaf(d){
		var sq = this.subqs[this.selSQ]
		if(sq.movePart(d)) return true

		var idx = this.selSQ + d
		if(idx<0){
			this.enterSQ(this.subqs.length-1, d)
			return true
		}
		if(idx>=this.subqs.length){
			this.enterSQ(0, d)
			return false
		}
		this.enterSQ(idx, d)
		return true
	}

	draw(ctx, idx, selected){
		var y = idx*ROW_HEIGHT + 50
		var total = 0
		var totalGiven = 0
		drawTextCent(20,y+40,this.qnum,selected?"white":"grey")
		var x = 70
		for(var i in this.subqs){
			var sq = this.subqs[i]
			total += sq.totalMarks()
			totalGiven += sq.totalGiven()
			sq.draw(ctx, x, y, i==this.selSQ,selected)
			x += sq.width()+20
		}
		x = Math.max(700, x+40)

		ctx.fillStyle = "black"
		ctx.fillRect(x-40,y+20,200,50)
		drawTextCent(x, y+45, totalGiven+"/"+total, selected?"white":"grey")
	}
}


var selQ = 0

qs = loadScheme().map(q => new Question(q.qnum, q.subqs.map(sq =>
	new SubQuestion(sq.letter, sq.marks, (sq.parts||[]).map(p => new Part(p.numeral, p.marks))))))


function draw(){
	init()
	for(var i in qs){
		qs[i].draw(ctx,i,i==selQ)
	}
}

function moveLeaf(d){
	if(qs[selQ].moveLeaf(d)) return
	selQ++
	if(selQ>=qs.length) selQ=0
	qs[selQ].selectFirstSQ()
}

function handleKey(key){
	switch(key){
		case "ArrowUp":
			selQ -=1
			if(selQ<0)selQ=qs.length-1
			break
		case "ArrowDown":
			selQ++
			if(selQ>=qs.length)selQ=0
			break
		case "ArrowLeft":
			moveLeaf(-1)
			break
		case "ArrowRight":
			moveLeaf(1)
			break
		case "PageDown":
			selQ = qs.length-1
			qs[selQ].selectFirstSQ()
			break
		case "PageUp":
			selQ = 0
			qs[selQ].selectFirstSQ()
			break
		default:
			if (key>='0' && key<='9'){
				key = parseInt(key,10)
				qs[selQ].setMark(key)
				moveLeaf(1)
			} else if (key>='a' && key <='z') {
				var q = qs[selQ]
				var id = key.charCodeAt(0) - 97
				if(id>=0 && id<q.subqs.length){
					q.enterSQ(id, 1)
				}
			} else {
				// console.log(key)
			}
			break
	}
	draw()
}


document.addEventListener('keydown', (event) => {
  handleKey(event.key)
});



init()
draw()

