document.addEventListener("DOMContentLoaded", function(){
    let gameModal;
    let content;
    
    function createGameModal() {
        gameModal = document.createElement("div");
        gameModal.classList.add("game-modal");

        content = document.createElement("div");
        content.classList.add("content");

       

        const img = document.createElement("img");
        img.src = "";

        const h4 = document.createElement("h4");
        h4.textContent = "";

        const p = document.createElement("p");
        p.innerHTML = "";

        const playAgainBtn = document.createElement("button");
        playAgainBtn.classList.add("play-again");
        playAgainBtn.textContent = "Play Again!";

        playAgainBtn.addEventListener("click", resetGame);

        content.appendChild(img);
        content.appendChild(h4);
        content.appendChild(p);
        content.appendChild(playAgainBtn);

        gameModal.appendChild(content);

        return gameModal;
    }
    
    const container = document.createElement("div");
    container.classList.add("container");


    const hangmanBox = document.createElement("div");
    hangmanBox.classList.add("hangman-box");

    const img = document.createElement("img");
    img.src = "hangman-0.svg";


    const h1 = document.createElement("h1");
    h1.textContent = "Hangman Game";


    hangmanBox.appendChild(img);
    hangmanBox.appendChild(h1);

    const gameBox = document.createElement("div");
    gameBox.classList.add("game-box");


    const wordDisplay = document.createElement("ul");
    wordDisplay.classList.add("word-display");

    

    const hintsAndWords = [
        { hint: "Capital city of Georgia", word: "TBILISI" },
        { hint: "Largest ocean on Earth", word: "PACIFIC" },
        { hint: "Highest mountain in the world", word: "EVEREST" },
        { hint: "Capital city of France", word: "PARIS" },
        { hint: "Guess the color", word: "RED" },
        { hint: "The hottest season", word: "SUMMER" },
        { hint: "The coldest season", word: "WINTER" },
        { hint: "The tallest animal", word: "GIRAFFE" },
        { hint: "Name a primary color", word: "BLUE" },
        { hint: "The largest mammal on Earth", word: "WHALE" },
        
    ];
    


    
    let randomIndex = Math.floor(Math.random() * hintsAndWords.length);
    let currentHintAndWord = hintsAndWords[randomIndex];
    let currentWord = currentHintAndWord.word;
    let wordLength = currentWord.length;
    let correctLetters = [];
    let wrongGuessCount = 0;
    let maxGuesses = 6;

    const resetGame = () => {
        randomIndex = Math.floor(Math.random() * hintsAndWords.length);
        currentHintAndWord = hintsAndWords[randomIndex];
        currentWord = currentHintAndWord.word;
        wordLength = currentWord.length;
        hintText.innerHTML = `Hint: <b>${currentHintAndWord.hint}</b>`;
        correctLetters = [];
        wrongGuessCount = 0;
        guessesText.innerHTML = `Incorrect Guesses: <span style="font-weight: bold;color:red">${wrongGuessCount} / ${maxGuesses}</span>`; 
        console.log('keyboard:' + keyboard.querySelector("button"));
        keyboard.querySelectorAll("button").forEach(btn => btn.disabled = false);
        wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("");
        img.src = `hangman-${wrongGuessCount}.svg`;
        gameModal.classList.remove("show");
    }

   


    for (let i = 0; i < wordLength; i++) {
        const letterLi = document.createElement("li");
        letterLi.classList.add("letter");
        if (i === 2) {
            letterLi.classList.add("guessed");
        }
        wordDisplay.appendChild(letterLi);
    }
    const hintText = document.createElement("h4");
    hintText.classList.add("Hint-text");
    hintText.innerHTML = `Hint: <b>${currentHintAndWord.hint}</b>`;
    


    guessesText = document.createElement("h4");
    guessesText.classList.add("Guesses-text");
    guessesText.innerHTML = "Incorrect Guesses: <b>0 / 6</b>";


    const keyboard = document.createElement("div");
    keyboard.classList.add("keyboard");

    const gameOver = (isVictory) => {
        console.log('bool:' + isVictory)
        console.log(gameModal);
        console.log(content);
        setTimeout(() => {
            let modalText = isVictory ? `You found the word: ` : `The correct word was: `;
            console.log('img:' + content.querySelectorAll("img")[0].src)
            content.querySelectorAll("img")[0].src = `${isVictory ? `Victory` : `Lost`}.gif`;
            content.querySelectorAll("h4")[0].innerText = `${isVictory ? `Congrats!` : `Game Over!`}`;
            content.querySelectorAll("p")[0].innerHTML = `${modalText} <b>${currentWord}</b>`;
            gameModal.classList.add("show");
        }, 300);
    }
    

    const initGame = (button, clickedLetter) => {
        button.disabled = true;
        if(currentWord.includes(clickedLetter)){
            [...currentWord].forEach((letter, index) => {
                if(letter === clickedLetter){
                    correctLetters.push(letter);
                    wordDisplay.querySelectorAll("li")[index].innerText = letter;
                    wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
                }
            })
        } else {
            wrongGuessCount++;
            guessesText.innerHTML = `Incorrect Guesses: <span style="font-weight: bold;color:red">${wrongGuessCount} / ${maxGuesses}</span>`; 
            img.src = `hangman-${wrongGuessCount}.svg`;
        }     
        button.disabled = true;
        if(wrongGuessCount === maxGuesses) return gameOver(false);
        if(correctLetters.length === currentWord.length) return gameOver(true);
    }

    for (let i = 65; i <= 90; i++) {
        const button = document.createElement("button");
        button.textContent = String.fromCharCode(i);
        keyboard.appendChild(button);
        button.addEventListener("click", e => initGame(e.target, String.fromCharCode(i)));
    }


    gameBox.appendChild(wordDisplay);
    gameBox.appendChild(hintText);
    gameBox.appendChild(guessesText);
    gameBox.appendChild(keyboard);

    
    container.appendChild(hangmanBox);
    container.appendChild(gameBox);


    document.body.appendChild(container);
    document.body.appendChild(createGameModal());

});