
	let lettersNotPicked = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
	let guessesLeft = 8;
	let word = getWord();
	let shownWord = [];
	for(let i = 0; i < word.length; ++i){
		shownWord.push("_");
	}

	function getWord(){
		let words = [
			"word","other","this","stuff",
			"orange","apple","hello","world",
			"get","great","regard","loyalty",
			"competence","subway","means",
			"mother","heart","wrestle",
			"candle","direct","concern","eavesdrop",
			"replace","guarantee","holiday",
			"academy","pray","clearance","age",
			"countryside","layer","push",
			"aware","patience"
		];

		let randomNum = Math.floor((Math.random() * words.length));
		return words[randomNum];
	}
	
	canvas =  function(){

		myDraw = document.getElementById("hangman");
		context = myDraw.getContext('2d');
		context.beginPath();
		context.strokeStyle = "red";
		context.lineWidth = 2;
	};
	head = function(){
		myDraw = document.getElementById("hangman");
		context = myDraw.getContext('2d');
		context.beginPath();
		context.arc(160, 55, 15, 0, Math.PI*2, true);
		context.stroke();
	}
	
	//function to link to input check to draw
	draw = function(fromX, fromY, toX, toY) {
		
		context.moveTo(fromX, fromY);
		context.lineTo(toX, toY);
		context.stroke(); 
	}

		neck = function() {
		 draw (160, 70, 160, 85);
		};	
		leftArm = function() {
		 draw (160, 85, 115, 100);
		};	
		rightArm = function() {
		 draw (160, 85, 205, 100);
		};	
		body = function() {
		 draw (160, 85, 160, 115);
		};	
		leftLeg = function() {
		 draw (160, 115, 110, 150);
		};	
		rightLeg = function() {
		 draw (160, 115, 210, 150);
		};	
		hangrope = function() {
		 draw (150, 78, 170, 78);
		};	
	
let drawArr = [head, neck ,leftArm, rightArm, body, leftLeg, rightLeg, hangrope];

// when page is loaded
window.onload = function () {

	// call getInput() if user hits enter while in text input field
    document.getElementById("guess").addEventListener("keyup", event => {
		if(event.keyCode === 13) getInput();
	});

	document.getElementById("mylife").innerHTML = guessesLeft;

	// add letters not picked to page
	displayLetterBank();

	// add word to page
	displayShownWord();
}

function getInput(){
	// get letter from user
	let letter = document.getElementById("guess").value;
	// reset text box
	document.getElementById("guess").value = "";

	// check if not letter
	if(letter.match(/^[A-Za-z]$/) == null || letter.length != 1){
		document.getElementById("inputError").innerHTML = "Must input a letter";
		document.getElementById("inputError").style.visibility = "visible";
		return;
	}

	letter = letter.toLowerCase();
	document.getElementById("inputError").style.visibility = "hidden";

	// if already picked this letter
	if(!lettersNotPicked.includes(letter)){
		// display letter already picked message
		document.getElementById("inputError").innerHTML = "you already picked this letter";
		document.getElementById("inputError").style.visibility = "visible";
		return;
	} else{ // have not picked this letter
		// remove letter from lettersNotPicked
		lettersNotPicked = lettersNotPicked.filter(element => element !== letter);

		// update html with new lettersNotPicked
		displayLetterBank();
		
		// if letter in word
		if(word.includes(letter)){
			for(let i = 0; i <= word.length; ++i){
				// if letter, update shownWord
				if(word.substr(i, 1) === letter){
					shownWord[i] = letter;
					displayShownWord();
				}
			}
		} else{ // letter not in word
			--guessesLeft;
			document.getElementById("mylife").innerHTML = guessesLeft;
			callDraw();
		}
	}
	
	function callDraw(){
		drawArr[0]();
		drawArr.shift();
	}

	// lost game
	if(guessesLeft <= 0){
		// display user lost
		endGame("You Lose");
	}
	// player wins
	if(!shownWord.includes("_")){
		// display player wins
		endGame("You Win");
	}
}

function endGame(message){
	document.getElementById("winFail").innerHTML = message;
	document.getElementById("winFail").style.visibility = "visible";
	document.getElementById("guess").disabled = true;
	document.getElementById("inputSubmit").disabled = true;
	document.getElementById("reset").style.visibility = "visible";
}

function resetGame(){
	lettersNotPicked = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
	guessesLeft = 8;
	word = getWord();
	shownWord = [];
	context.clearRect(100, 37.5, 200, 200);
	drawArr = [head, neck, leftArm, rightArm, body, leftLeg, rightLeg, hangrope];
	for(let i = 0; i < word.length; ++i){
		shownWord.push("_");
	}
	displayLetterBank();
	displayShownWord();
	document.getElementById("winFail").style.visibility = "hidden";
	document.getElementById("reset").style.visibility = "hidden";
	document.getElementById("mylife").innerHTML = guessesLeft;
	document.getElementById("guess").disabled = false;
	document.getElementById("inputSubmit").disabled = false;
}

// display shown word
function displayShownWord(){
	document.getElementById('arrayMessage').innerHTML = "";
	for(let i = 0; i < shownWord.length; i++){
		document.getElementById('arrayMessage').innerHTML += shownWord[i]+"\t";
	}
}

// add letters not picked to page
function displayLetterBank(){
	// remove letter list
	document.getElementById("letter").remove();
	// add ul to letters
	var ul = document.createElement("ul");
	ul.id = "letter"
	document.getElementById("letters").appendChild(ul);

	// add lis to ul
	for (i = 0; i < lettersNotPicked.length; i++) {
		var li = document.createElement("li");
		var text = document.createTextNode(lettersNotPicked[i]);
		li.appendChild(text);
		document.getElementById("letter").appendChild(li);
	}
}