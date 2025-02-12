'use strict';

// Uncomment the next lines to use your game instance in the browser
// const Game = require('../modules/Game.class');
// const game = new Game();

class Game {
  constructor(initialState) {
    if (initialState) {
      this.initialState = initialState;
    }

    this.cells = [];
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

  moveLeft() {
    this.fieldReader(this.table);
    this.printScore(this.score);
  }

  moveRight() {
    this.fieldReader(this.table);
    this.printScore(this.score);
  }

  moveUp() {
    this.fieldReader(this.table);
    this.printScore(this.score);
  }

  moveDown() {
    this.fieldReader(this.table);
    this.printScore(this.score);
  }

  randomBorn() {
    return Math.random() < 0.9 ? 2 : 4;
  }

  born() {
    let empties = [];
    const born = this.randomBorn();

    for (let i = 0; i < 16; i++) {
      if (this.tbody[i].textContent === '') {
        empties.push(this.tbody[i]);
      }
    }

    if (empties.length === 0) {
      return;
    }

    let randomEmptyCeil = Math.floor(Math.random() * empties.length);

    while (empties[randomEmptyCeil].textContent !== '') {
      randomEmptyCeil = Math.floor(Math.random() * empties.length);
    }

    empties[randomEmptyCeil].textContent = born;
    empties[randomEmptyCeil].classList.add(`field-cell--${born}`);
    empties = [];
    this.printScore();
  }

  start() {
    const randomIndex1 = Math.floor(Math.random() * 16);
    let randomIndex2 = Math.floor(Math.random() * 15);

    while (randomIndex1 === randomIndex2) {
      randomIndex2 = Math.floor(Math.random() * 15);
    }

    for (let i = 0; i < 16; i++) {
      if (i === randomIndex1 || i === randomIndex2) {
        this.tbody[i].classList.add('field-cell--2');
        this.tbody[i].textContent = 2;
      }
    }
    this.status = 'playing';
  }

  restart() {
    for (let i = 0; i < 16; i++) {
      [...this.tbody[i].classList].forEach((item) => {
        if (item.startsWith('field-cell--')) {
          this.tbody[i].classList.remove(item);
        }
      });
      this.tbody[i].textContent = '';
    }
    this.status = 'idle';
  }

  printScore() {
    let sum = 0;

    for (let i = 0; i < 16; i++) {
      sum += +this.cells[i].textContent;
    }

    this.score.textContent = sum;
  }

  fieldReader() {
    for (let i = 0; i < 4; i++) {
      this.cells.length = 0;
    }

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        this.cells.push(this.table.rows[i].cells[j]);
      }
    }

    return this.cells;
  }
}

const game = new Game();
const start = document.querySelector('.button');

document.addEventListener('keydown', (ev) => {
  if (game.status === 'playing') {
    switch (ev.key) {
      case 'ArrowUp':
        game.moveUp();
        game.born();
        break;
      case 'ArrowDown':
        game.moveDown();
        game.born();
        break;
      case 'ArrowLeft':
        game.moveLeft();
        game.born();
        break;
      case 'ArrowRight':
        game.moveRight();
        game.born();
    }
  }
});

start.addEventListener('click', (e) => {
  if (game.status === 'idle') {
    game.start();
    start.textContent = 'Restart';
    start.classList.add('restart');
    start.classList.remove('start');
    document.querySelector('.message-container').classList.add('hidden');
  } else {
    game.restart();
    start.textContent = 'Start';
    start.classList.add('start');
    start.classList.remove('restart');
    document.querySelector('.message-container').classList.remove('hidden');
  }

  game.fieldReader();
  game.printScore();
});
