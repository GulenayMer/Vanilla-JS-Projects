// Grabing the DOM Elements that I need
const wrongLetterEl = document.getElementById("wrong-letters");
const popup = document.getElementById("popup-container");
const finalMessg = document.getElementById("final-message");
const notification = document.getElementById("notification-container");
const playBtn = document.getElementById("play-button");
const wordEl = document.getElementById("word");
const figureParts = document.querySelectorAll(".figure-part");

// an array, could be used Fetch API, too.
const words = ["application", "programming", "interface", "wizard"];
// selecting the words randomly
let selectedWord = words[Math.floor(Math.random() * words.length)];

// store the  correct letters ans wrong letters separately
const correctLetters = [];
const wrongLetters = [];

// -------------------- FUNCTIONS -------------------------//

// show the hidden word
function displayWord () {
    // split the selected word to its characters, then map through by the function letter
    // if correctLetters array includes letter in the selectedword, then show the letter written, if not nothing
    // and return the array as a string in the end by join()
    wordEl.innerHTML = `
    ${selectedWord.split("")
    .map(letter => `<span class="letter">
    ${correctLetters.includes(letter) ? letter : " "}</span>`)
    .join("") //The join() method returns the array as a string.
     }`;

// replacing the new line element with an empty string
const innerWord = wordEl.innerText.replace(/\n/g, "");

if(innerWord === selectedWord) {
    finalMessg.innerText = "Congratulations!"
    popup.style.display = "flex";
}
};

displayWord();


//update the wrong letters
function updateWrongLettersEl(){
//console.log("update");
// display wrong letters
wrongLetterEl.innerHTML = `
${wrongLetters.length > 0 ? "<p>Wrong</p>" : " "}
${wrongLetters.map(letter => `<span>${letter}</span>`)}
`;

//display parts
figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;

    if(index < errors){
        part.style.display = "block";
    } else {
        part.style.display = "none";
    }
});

// check if lost
if(wrongLetters.length === figureParts.length){
    finalMessg.innerText = "lost";
    popup.style.display = "flex";
}

}


// show notification
function showNotification(){
   notification.classList.add("show");

   // disappears after certain amount of time
   setTimeout(() => {
    notification.classList.remove("show");
   }, 2000) // 2000 is 2 seconds
};


// --------------------------------------EVENT LISTENERS --------------------------//

// Keydown letter press
window.addEventListener("keydown", e => {
   //keycode-- letters keycode is from 65 to 90
if(e.code >= 65 && e.code <= 90){
    const letter = e.key;

    if(selectedWord.includes(letter)){
        if(!correctLetters.includes(letter)){
            correctLetters.push(letter);
            displayWord();
        } else {
            showNotification();
        }
    } else {
       if(!wrongLetters.includes(letter)){
           wrongLetters.push(letter);
           updateWrongLettersEl();
       } else {
           showNotification();
       }

    }

}

});


// restart game and play again
playBtn.addEventListener("click", () => {
    //empty arrrays
    correctLetters.splice(0);
    wrongLetters.splice(0);


    selectedWord = words[Math.floor(Math.random() * words.length)];
displayWord();

updateWrongLettersEl();

popup.style.display = "none";
})







