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
let lives = 5;

const displayKeyboard = () => {
  for (let i = 0; i < buttons.length; i+=1) {
    const button = buttons[i];

  }
};

const pickRandom = () => {

};

let gamePhrase = phrases[pickRandom()];

startGameButton.addEventListener('click', () => {
  displayKeyboard();
});
