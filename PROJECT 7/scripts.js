// Get DOM Elements
const word = document.getElementById('word');
const incorrectLetters = document.getElementById('incorrect-letters');
const popup = document.getElementById('popup-container');
const finalMessage = document.getElementById('final-message');
const playBtn = document.getElementById('play-btn');
const notification = document.getElementById('notification-container');

// Get DOM Elements for Hangman
const figureParts = document.querySelectorAll('.figure-part');

// Pool of words
const words = ["scientist", "song", "built", "word", "spell", "value", "support", "heavy", "men", "dead"];

// Select a word at random
let selectedWord = words[Math.floor(Math.random() * words.length)];

// Correct and incorrect guesses
const correctLettersArray = [];
const incorrectLettersArray = [];

// Display the word
function displayWord() {
    word.innerHTML = `
        ${selectedWord
            .split('')
            .map(letter => `
                <span class="letter">
                    ${correctLettersArray.includes(letter) ? letter : ''}
                </span>
            `).join('')}
    `;

    const innerWord = word.textContent.replace(/\n/g, '');

    // Check for win
    if (innerWord === selectedWord) {
        finalMessage.innerText = 'Congratulations! You won!';
        popup.style.display = 'flex';
    }
}

// Show notification
function showNotification() {
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}

// Update incorrect letters
function updateIncorrectLetters() {
    incorrectLetters.innerHTML = `
        ${incorrectLettersArray.length > 0 ? '<p>Incorrect letters:</p>' : ''}
        ${incorrectLettersArray.map(letter => `<span>${letter}</span>`).join('')}
    `;

    // Display hangman parts
    figureParts.forEach((part, index) => {
        const errors = incorrectLettersArray.length;
        part.style.display = index < errors ? 'block' : 'none';
    });

    // Check for loss
    if (incorrectLettersArray.length === figureParts.length) {
        finalMessage.innerText = 'You Lost!';
        popup.style.display = 'flex';
    }
}

// Listen for keypress
window.addEventListener('keydown', e => {
    if (e.key >= 'a' && e.key <= 'z') {
        const letter = e.key.toLowerCase();

        if (selectedWord.includes(letter)) {
            if (!correctLettersArray.includes(letter)) {
                correctLettersArray.push(letter);
                displayWord();
            } else {
                showNotification();
            }
        } else {
            if (!incorrectLettersArray.includes(letter)) {
                incorrectLettersArray.push(letter);
                updateIncorrectLetters();
            } else {
                showNotification();
            }
        }
    }
});

// Play again
playBtn.addEventListener('click', () => {
    correctLettersArray.splice(0);
    incorrectLettersArray.splice(0);
    selectedWord = words[Math.floor(Math.random() * words.length)];
    updateIncorrectLetters();
    popup.style.display = 'none';
    displayWord();
});

// Initialize game
displayWord();
