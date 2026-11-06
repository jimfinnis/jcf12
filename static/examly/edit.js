
var scheme = loadScheme()

function toRoman(n){
	const table = [[10,"x"],[9,"ix"],[5,"v"],[4,"iv"],[1,"i"]]
	var res = ""
	for(const [val,sym] of table){
		while(n>=val){ res+=sym; n-=val }
	}
	return res
}

function subqMarks(sq){
	return (sq.parts && sq.parts.length) ? sq.parts.reduce((s,p) => s+(p.marks||0), 0) : (sq.marks||0)
}

function questionMarks(q){
	return q.subqs.reduce((s,sq) => s+subqMarks(sq), 0)
}

function render(){
	const container = document.getElementById("questions")
	container.innerHTML = ""

	scheme.forEach((q, qi) => {
		const qDiv = document.createElement("div")
		qDiv.className = "question"

		const qnumInput = document.createElement("input")
		qnumInput.className = "qnum"
		qnumInput.value = q.qnum
		qnumInput.addEventListener("change", () => { q.qnum = qnumInput.value })
		qDiv.appendChild(qnumInput)

		const removeQButton = document.createElement("button")
		removeQButton.textContent = "remove question"
		removeQButton.addEventListener("click", () => {
			scheme.splice(qi, 1)
			render()
		})
		qDiv.appendChild(removeQButton)

		const qTotalSpan = document.createElement("span")
		qTotalSpan.className = "qtotal"
		qDiv.appendChild(qTotalSpan)

		function updateQTotal(){
			qTotalSpan.textContent = questionMarks(q) + " marks total"
		}
		updateQTotal()

		q.subqs.forEach((sq, sqi) => {
			const sqDiv = document.createElement("div")
			sqDiv.className = "subq"

			const letterInput = document.createElement("input")
			letterInput.className = "letter"
			letterInput.value = sq.letter
			letterInput.maxLength = 1
			letterInput.addEventListener("change", () => { sq.letter = letterInput.value })
			sqDiv.appendChild(letterInput)

			const hasParts = sq.parts && sq.parts.length > 0

			const marksInput = document.createElement("input")
			marksInput.className = "marks"
			marksInput.type = "number"
			marksInput.min = 0
			marksInput.value = subqMarks(sq)
			marksInput.disabled = hasParts
			marksInput.title = hasParts ? "marks are the sum of this sub-question's parts" : ""
			marksInput.addEventListener("change", () => {
				sq.marks = parseInt(marksInput.value, 10) || 0
				updateQTotal()
			})
			sqDiv.appendChild(marksInput)

			const removeSQButton = document.createElement("button")
			removeSQButton.textContent = "remove"
			removeSQButton.addEventListener("click", () => {
				q.subqs.splice(sqi, 1)
				render()
			})
			sqDiv.appendChild(removeSQButton)

			const addPartButton = document.createElement("button")
			addPartButton.textContent = "add part"
			addPartButton.addEventListener("click", () => {
				if(!sq.parts) sq.parts = []
				sq.parts.push({numeral: toRoman(sq.parts.length + 1), marks: 1})
				render()
			})
			sqDiv.appendChild(addPartButton)

			qDiv.appendChild(sqDiv)

			if(hasParts){
				sq.parts.forEach((p, pi) => {
					const pDiv = document.createElement("div")
					pDiv.className = "part"

					const numeralInput = document.createElement("input")
					numeralInput.className = "numeral"
					numeralInput.value = p.numeral
					numeralInput.addEventListener("change", () => { p.numeral = numeralInput.value })
					pDiv.appendChild(numeralInput)

					const partMarksInput = document.createElement("input")
					partMarksInput.className = "marks"
					partMarksInput.type = "number"
					partMarksInput.min = 0
					partMarksInput.value = p.marks
					partMarksInput.addEventListener("change", () => {
						p.marks = parseInt(partMarksInput.value, 10) || 0
						marksInput.value = subqMarks(sq)
						updateQTotal()
					})
					pDiv.appendChild(partMarksInput)

					const removePButton = document.createElement("button")
					removePButton.textContent = "remove"
					removePButton.addEventListener("click", () => {
						const total = subqMarks(sq)
						sq.parts.splice(pi, 1)
						if(sq.parts.length === 0){
							sq.marks = total || 1
							sq.parts = null
						}
						render()
					})
					pDiv.appendChild(removePButton)

					qDiv.appendChild(pDiv)
				})
			}
		})

		const addSQButton = document.createElement("button")
		addSQButton.textContent = "add sub-question"
		addSQButton.addEventListener("click", () => {
			const nextLetter = String.fromCharCode(97 + q.subqs.length)
			q.subqs.push({letter: nextLetter, marks: 1})
			render()
		})
		qDiv.appendChild(addSQButton)

		container.appendChild(qDiv)
	})
}

function setStatus(msg){
	const status = document.getElementById("status")
	status.textContent = msg
	setTimeout(() => { status.textContent = "" }, 1500)
}

document.getElementById("addQuestion").addEventListener("click", () => {
	scheme.push({qnum: scheme.length + 1, subqs: [{letter: "a", marks: 1}]})
	render()
})

document.getElementById("save").addEventListener("click", () => {
	saveScheme(scheme)
	setStatus("saved")
})

document.getElementById("exportFile").addEventListener("click", () => {
	const blob = new Blob([JSON.stringify(scheme, null, 2)], {type: "application/json"})
	const url = URL.createObjectURL(blob)
	const a = document.createElement("a")
	a.href = url
	a.download = "examly-scheme.json"
	a.click()
	URL.revokeObjectURL(url)
})

document.getElementById("importFile").addEventListener("click", () => {
	document.getElementById("fileInput").click()
})

document.getElementById("fileInput").addEventListener("change", (event) => {
	const file = event.target.files[0]
	event.target.value = ""
	if(!file) return

	const reader = new FileReader()
	reader.onload = () => {
		try {
			scheme = JSON.parse(reader.result)
		} catch(e){
			setStatus("invalid file")
			return
		}
		render()
		setStatus("loaded - click save to keep it")
	}
	reader.readAsText(file)
})

render()
