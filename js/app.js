//**********//
// Variables//
//**********//

// Array of possible phrases
const phrases = [
  'A FRIENDLY PIECE OF ADVICE',
  'A LITTLE BIRD TOLD ME',
  'A ROLL OF THE DICE',
  'A PIECE OF THE ACTION',
  'AS A MATTER OF FACT',
  'BASED ON A TRUE STORY',
  'BUY ONE GET ONE FREE',
  'CHIP OFF THE OLD BLOCK',
  'EVERY DOG HAS ITS DAY',
  'GET A WHIFF OF THIS',
];

const startGameButton = document.querySelector('.btn__reset');
const buttons = document.querySelectorAll('#qwerty button');
const overlay = document.querySelector('#overlay');
const qwertySection = document.querySelector('#qwerty');
const phraseSection = document.querySelector('#phrase');
const scoreboardSection = document.querySelector('#scoreboard');
const title = document.querySelector('.title');
let gamePhrase = undefined;
let missed = 0;

//**********//
// Functions//
//**********//
const getRandomPhraseAsArray = (arr) => {
  const index = Math.floor((Math.random() * 10) + 1);
  const phrase = Array.from(arr[index]);
  return phrase;
};

const addPhraseToDisplay = (arr) => {
  const ul = phraseSection.lastElementChild;
  for (let i = 0; i < arr.length; i += 1) {
    const li = document.createElement('li');
    li.textContent = arr[i];
    ul.appendChild(li);
    if (gamePhrase[i] !== ' ') {
      li.className += 'letter';
    } else {
      li.className += 'space';
    }
  }
};

const checkLetter = (letter) => {
  const liCollection = phraseSection.firstElementChild.children;
  if (gamePhrase.indexOf(letter.toUpperCase()) != -1){
    for (let i = 0; i < gamePhrase.length; i += 1) {
      if (gamePhrase[i] === letter.toUpperCase()) {
        liCollection[i].className += ' show';
      }
    }
  } else {
    missed += 1;
    const hearts = scoreboardSection.firstElementChild;
    hearts.removeChild(hearts.lastElementChild);
  }
};

const checkWin = () => {
  const letterCollection = phraseSection.querySelectorAll('.letter');
  const showCollection = phraseSection.querySelectorAll('.show');
  if (letterCollection.length === showCollection.length) {
    return true;
  } else if (missed === 5) {
    return false;
  }
};

// Main game logic
const game = (e) => {

  // If event target is the "start game" button:
  if (e.target.className === 'btn__reset') {
    if (startGameButton.textContent === 'Play Again') {
      window.location.reload();
    } else {
      overlay.style.display = 'none';
      gamePhrase = getRandomPhraseAsArray(phrases);
      addPhraseToDisplay(gamePhrase);
    }
  }

  // If event target is a button element:
  if (e.target.tagName === 'BUTTON') {
      const letter = e.target.textContent;
      checkLetter(letter);
      e.target.className += ' chosen';
      e.target.setAttribute('disabled', 'true');
  }

  // If event is a keyup event:
  if (e.type === 'keyup') {
    const key = e.key;
    checkLetter(key);
    for (let i = 0; i < buttons.length; i += 1) {
      if (buttons[i].textContent === key) {
        buttons[i].className += ' chosen';
        buttons[i].setAttribute('disabled', 'true');
      }
    }
  }

  // Disables checking for win conditions while overlay is showing:
  if (overlay.style.display === 'none') {
    if (checkWin()) {
      overlay.style.display = '';
      overlay.className += ' win';
      title.textContent = 'Winner!';
      startGameButton.textContent = 'Play Again';
    } else if (checkWin() === false) {
      overlay.style.display = '';
      overlay.className += ' lose';
      title.textContent = 'Sorry, you lose.';
      startGameButton.textContent = 'Play Again';
    }
  }
}

//****************//
// Event Listeners//
//****************//
document.addEventListener('click', game);
document.addEventListener('keyup', game);
