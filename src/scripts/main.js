'use strict';

const Game = require('../modules/Game.class');

const game = new Game();
const button = document.querySelector('.button');
const scoreElement = document.querySelector('.game-score');
const bestScoreElement = document.querySelector('.best-score');

const messageStart = document.querySelector('.message-start');
const messageWin = document.querySelector('.message-win');
const messageLose = document.querySelector('.message-lose');

bestScoreElement.textContent = localStorage.getItem('bestScore') || 0;

// idle | playing | win | lose

function saveScore() {
  localStorage.setItem('bestScore', game.getScore());
}

function gameCallback(e) {
  if (game.status !== 'playing') {
    return;
  }

  switch (e.key) {
    case 'ArrowLeft':
      game.moveLeft();
      break;
    case 'ArrowRight':
      game.moveRight();
      break;
    case 'ArrowUp':
      game.moveUp();
      break;
    case 'ArrowDown':
      game.moveDown();
      break;
    default:
      return;
  }

  scoreElement.textContent = game.getScore();

  if (game.getScore() > parseInt(bestScoreElement.textContent)) {
    bestScoreElement.textContent = game.getScore();
    saveScore();
  }

  if (game.status === 'lose') {
    messageLose.classList.remove('hidden');
  }

  if (game.status === 'win') {
    messageWin.classList.remove('hidden');
  }
}

button.addEventListener('click', () => {
  if (game.status === 'playing') {
    game.restart();

    button.textContent = 'Start';
    button.classList.add('start');
    button.classList.remove('restart');

    scoreElement.textContent = game.getScore();

    messageStart.classList.remove('hidden');
    messageLose.classList.add('hidden');
    messageWin.classList.add('hidden');

    document.removeEventListener('keydown', gameCallback);
  } else {
    game.start();
    button.textContent = 'Restart';
    button.classList.add('restart');
    button.classList.remove('start');

    messageStart.classList.add('hidden');
    messageLose.classList.add('hidden');
    messageWin.classList.add('hidden');

    scoreElement.textContent = game.getScore();

    document.addEventListener('keydown', gameCallback);
  }
});
