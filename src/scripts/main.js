'use strict';

// Uncomment the next lines to use your game instance in the browser
// const Game = require('../modules/Game.class');
// const game = new Game();

class Game {
  constructor(initialState) {
    if (initialState) {
      this.initialState = initialState;
    }

    this.cells = [[], [], [], []];
    this.score = document.querySelector('.game-score');
    this.table = document.querySelector('.game-field');
    this.tbody = document.querySelectorAll('.game-field tbody td');
    this.status = 'idle';
  }

  getState() {}

  getScore() {
    return this.score;
  }

  getStatus() {
    return this.status;
  }

  moveLeft(cell, n = 1) {
    if (cell.style.left !== '0px') {
      cell.style.left =
        +cell.style.left
          .split('')
          .filter((ch) => ch.toUpperCase() === ch.toLowerCase())
          .join('') -
        83 * n +
        'px';
    }
  }

  moveRight(cell, n = 1) {
    if (cell.style.left !== '249px') {
      cell.style.left =
        +cell.style.left
          .split('')
          .filter((ch) => ch.toUpperCase() === ch.toLowerCase())
          .join('') +
        83 * n +
        'px';
    }
  }

  moveUp(cell, n = 1) {
    if (cell.style.top !== '0px') {
      cell.style.top =
        +cell.style.top
          .split('')
          .filter((ch) => ch.toUpperCase() === ch.toLowerCase())
          .join('') -
        83 * n +
        'px';
    }
  }

  moveDown(cell, n = 1) {
    if (cell.style.top !== '249px') {
      cell.style.top =
        +cell.style.top
          .split('')
          .filter((ch) => ch.toUpperCase() === ch.toLowerCase())
          .join('') +
        83 * n +
        'px';
    }
  }

  born() {
    const newCell = document.createElement('div');
    const random = Math.random() > 0.9 ? 4 : 2;

    newCell.classList.add('cell');
    newCell.classList.add(`cell--${random}`);
    newCell.textContent = random;
    document.querySelector('.game-field').appendChild(newCell);
  }

  start() {
    this.born();
    this.born();
    this.status = 'playing';
  }

  restart() {
    document.querySelectorAll('.cell').forEach((cell) => cell.remove());
    this.status = 'idle';
  }

  printScore() {
    let sum = 0;

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        sum += +this.cells[i][j].textContent;
      }
    }

    this.score.textContent = sum;
  }

  fieldReader() {
    for (let i = 0; i < 4; i++) {
      this.cells[i] = [];
    }

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        this.cells[i].push(this.table.rows[i].cells[j]);
      }
    }

    return this.cells;
  }
}

const game = new Game();
const start = document.querySelector('.button');

document.addEventListener('keydown', (ev) => {
  const cell = document.querySelector('.cell');

  switch (ev.key) {
    case 'ArrowRight':
      game.moveRight(cell);
      break;
    case 'ArrowLeft':
      game.moveLeft(cell);
      break;
    case 'ArrowUp':
      game.moveUp(cell);
      break;
    case 'ArrowDown':
      game.moveDown(cell);
  }
});

start.addEventListener('click', (e) => {
  if (game.status === 'idle') {
    game.start();
    start.textContent = 'Restart';
    start.classList.add('restart');
    start.classList.remove('start');
    document.querySelector('.message-start').classList.add('hidden');
  } else {
    game.restart();
    start.textContent = 'Start';
    start.classList.add('start');
    start.classList.remove('restart');
    document.querySelector('.message-start').classList.remove('hidden');
  }
});
