'use strict';

// Uncomment the next lines to use your game instance in the browser
// const Game = require('../modules/Game.class');
// const game = new Game();

class Game {
  constructor(initialState) {
    if (initialState) {
      this.initialState = initialState;
    }

    this.cells = [[1], [], [], []];
    this.score = document.querySelector('.game-score');
    this.table = document.querySelector('.game-field');
    this.status = 'idle';
  }

  getState() {
  }

  getScore() {
    return this.score;
  }

  getStatus() {
    return this.status;
  }

  moveLeft() {
    this.fieldReader(this.table);
    this.score(this.score);
  }

  moveRight() {
    this.fieldReader(this.table);
    this.score(this.score);
  }

  moveUp() {
    this.fieldReader(this.table);
    this.score(this.score);
  }

  moveDown() {
    this.fieldReader(this.table);
    this.score(this.score);
  }

  start() {
    const randomIndex1 = Math.floor(Math.random() * 16);
    let randomIndex2 = Math.floor(Math.random() * 15);

    while (randomIndex1 === randomIndex2) {
      randomIndex2 = Math.floor(Math.random() * 15);
    }

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (i * 4 + j === randomIndex1 || i * 4 + j === randomIndex2) {
          this.table.rows[i].cells[j].classList.add('field-cell--2');
          this.table.rows[i].cells[j].textContent = 2;
        }
      }
    }

    this.status = 'playing';
  }

  restart() {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        [...this.table.rows[i].cells[j].classList].forEach((item) => {
          if (item.startsWith('field-cell--')) {
            this.table.rows[i].cells[j].classList.remove(item);
          }
        });
        this.table.rows[i].cells[j].textContent = '';
      }
    }

    this.status = 'idle';
  }

  printScore() {
    let sum = 0;

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        sum += this.cells[i][j];
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
        this.cells[i].push(+this.table.rows[i].cells[j].textContent);
      }
    }

    return this.cells;
  }
}

const game = new Game();
const start = document.querySelector('.button');

document.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'ArrowUp':
      game.moveUp();
      break;
    case 'ArrowDown':
      game.moveDown();
      break;
    case 'ArrowLeft':
      game.moveLeft();
      break;
    case 'ArrowRight':
      game.moveRight();
  }
});

start.addEventListener('click', (e) => {
  if (game.status === 'idle') {
    game.start();
    start.textContent = 'Restart';
    start.classList.add('restart');
    start.classList.remove('start');
  } else {
    game.restart();
    start.textContent = 'Start';
    start.classList.add('start');
    start.classList.remove('restart');
  }

  game.fieldReader();
  game.printScore();
});
