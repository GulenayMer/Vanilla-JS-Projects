const wrongLetter = document.getElementById("wrong-letters");
const word = document.getElementById("word");
const popupMsg = document.getElementById("popup-container");
const finalMsg = document.getElementById("final-message");
const playBtn = document.getElementById("play-button");
const notification = document.getElementById("notification-container");
const figureParts = document.querySelectorAll(".figure-part");


const	words = ["application", "programming", "interface", "wizard"];
let		selectedWord = words[Math.floor(Math.random() * words.length)];
const	correctLetters = [];
const	wrongLetters = [];

/* show the hidden word */
/*  split the selected word to its characters,
	then map through by the func. letter
 	if correctLetters array includes letter in the selectedword, then show the letter written, if not nothing
    and return the array as a string in the end by join() 
*/
function displayWord() 
{
 
    word.innerHTML = `
    	${selectedWord
			.split('')
    		.map(letter => `
				<span class="letter">
					${correctLetters.includes(letter) ? letter : ''}
				</span>
			`)
			.join("")
     	}`;

	// replacing the new line element with an empty string
	const	innerWord = word.innerText.replace(/\n/g, '');

	if (innerWord === selectedWord) 
	{
    	finalMsg.innerText = "Congratulations!"
    	popup.style.display = "flex";
	}
};

displayWord();


function updateWrongLetters()
{
	wrongLetter.innerHTML = `
		${wrongLetters.length > 0 ? "<p>Wrong</p>" : " "}
		${wrongLetters.map(letter => `<span>${letter}</span>`)}
	`;

	figureParts.forEach((part, index) => {
	    const	errors = wrongLetters.length;

	    if (index < errors)
		{
	        part.style.display = "block";
	    }
		else
		{
	        part.style.display = "none";
	    }
	});

	if (wrongLetters.length === figureParts.length)
	{
	    finalMsg.innerText = "you lost";
	    popupMsg.style.display = "flex";
	}
}

function showNotification()
{
   notification.classList.add("show");
   // disappears after certain amount of time
   setTimeout(() => {
    notification.classList.remove("show");
   }, 2000);
};


window.addEventListener('keydown', e => {
	
	if(e.keyCode >= 65 && e.keyCode <= 90)
	{
    	const	letter = e.key;

    	if (selectedWord.includes(letter))
		{
        	if(!correctLetters.includes(letter))
			{
            	correctLetters.push(letter);
            	displayWord();
        	}
			else
			{
            	showNotification();
        	}
    	}
		else 
		{

       		if(!wrongLetters.includes(letter))
			{
       			wrongLetters.push(letter);
       			 updateWrongLetters();
       		}
			else 
			{
       			showNotification();
       		}
    	}
	}
});


playBtn.addEventListener('click', () => {
    correctLetters.splice(0);
    wrongLetters.splice(0);
    selectedWord = words[Math.floor(Math.random() * words.length)];
	displayWord();
	updateWrongLetters();
	popupMsg.style.display = "none";
})
