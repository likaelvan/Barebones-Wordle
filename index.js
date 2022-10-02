"use strict";
const appDiv = document.getElementById('get_url');
function makeLabel(text) {
    const label = document.createElement("label");
    label.textContent = text;
    return label;
}
function makeWordleScreen(key) {
    let elements = [];
    let numOfGuesses = 6;
    const inputBox = document.createElement("input");
    inputBox.setAttribute("type", "text");
    inputBox.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            let wordGuess = inputBox.value.toUpperCase();
            key = key.toUpperCase();
            if (wordGuess.length == 5) {
                const guess = document.createElement('p');
                for (let i = 0; i < 5; i++) {
                    const temp_span = document.createElement('span');
                    temp_span.textContent = wordGuess[i];
                    if (wordGuess[i] == key[i]) {
                        temp_span.classList.add("correct");
                    }
                    else if (key.includes(wordGuess[i])) {
                        temp_span.classList.add("misplaced");
                    }
                    else {
                        temp_span.classList.add("wrong");
                    }
                    guess.appendChild(temp_span);
                }
                appDiv === null || appDiv === void 0 ? void 0 : appDiv.appendChild(guess);
                if (wordGuess === key) {
                    setTimeout(function () { alert("GOOD JOB! You guessed the word."); }, 10);
                    inputBox.disabled = true;
                }
                else if (numOfGuesses > 1) {
                    numOfGuesses--;
                    inputBox.value = '';
                }
                else {
                    setTimeout(function () { alert(`Game Over! The correct word is ${key}.`); }, 10);
                    inputBox.disabled = true;
                }
            }
            else {
                alert("Error! Input should be exactly 5 lettters.");
            }
        }
    });
    elements.push(inputBox);
    const alphabet = document.createElement('p');
    alphabet.textContent = " A B C D E F G H I J K L M N O P Q R S T U V W X Y Z";
    elements.push(alphabet);
    appDiv === null || appDiv === void 0 ? void 0 : appDiv.replaceChildren(...elements);
}
function makeStartScreen() {
    if (appDiv != null) {
        let elements = [];
        const inputBox = document.createElement("input");
        inputBox.setAttribute("type", "text");
        inputBox.size = 100;
        inputBox.value = "https://gist.githubusercontent.com/dracos/dd0668f281e685bad51479e5acaadb93/raw/ca9018b32e963292473841fb55fd5a62176769b5/valid-wordle-words.txt";
        elements.push(inputBox);
        const inputButton = document.createElement("button");
        inputButton.setAttribute("type", "button");
        inputButton.textContent = "GO";
        inputButton.addEventListener('click', () => {
            if (inputBox.value != '') {
                let xhr = new XMLHttpRequest();
                xhr.open('GET', inputBox.value);
                xhr.onload = function () {
                    const words = xhr.responseText.split("\n");
                    const randomIndex = Math.floor(Math.random() * words.length);
                    const wordle = words[randomIndex];
                    console.log(wordle);
                    makeWordleScreen(wordle);
                };
                xhr.send();
            }
            else {
                alert("Error! No URL was specified.");
            }
        });
        elements.push(inputButton);
        appDiv.replaceChildren(...elements);
    }
}
makeStartScreen();
