
const SCHEME_KEY = "examly.scheme"

const DEFAULT_SCHEME = [
	{qnum: 3, subqs: [{letter:"a",marks:5},{letter:"b",marks:4},{letter:"c",marks:3},{letter:"d",marks:5}]},
	{qnum: 4, subqs: [{letter:"a",marks:8},{letter:"b",marks:8}]},
	{qnum: 5, subqs: [{letter:"a",marks:8},{letter:"b",marks:5},{letter:"c",marks:4}]},
	{qnum: 6, subqs: [{letter:"a",marks:4},{letter:"b",marks:4},{letter:"c",marks:4},{letter:"d",marks:4}]},
]

function loadScheme(){
	const raw = localStorage.getItem(SCHEME_KEY)
	if(!raw) return DEFAULT_SCHEME
	try {
		return JSON.parse(raw)
	} catch(e) {
		return DEFAULT_SCHEME
	}
}

function saveScheme(scheme){
	localStorage.setItem(SCHEME_KEY, JSON.stringify(scheme))
}
