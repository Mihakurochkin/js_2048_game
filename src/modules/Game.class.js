'use strict';

class Game {
  constructor() {
    this.state = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];
    this.score = 0;
    this.status = 'idle';
    this.moved = false;
  }

  getState() {
    return this.state;
  }

  getScore() {
    return this.score;
  }

  getStatus() {
    return this.status;
  }

  moveLeft() {
    for (let i = 0; i < this.state.length; i++) {
      const merged = [false, false, false, false];

      for (let j = 1; j < this.state[i].length; j++) {
        if (this.state[i][j] === 0) {
          continue;
        }

        let k = j;

        while (k > 0 && this.state[i][k - 1] === 0) {
          this.state[i][k - 1] = this.state[i][k];
          this.state[i][k] = 0;
          this.moved = true;
          k--;
        }

        if (
          k > 0 &&
          this.state[i][k - 1] === this.state[i][k] &&
          !merged[k - 1] &&
          !merged[k]
        ) {
          this.state[i][k - 1] *= 2;
          this.score += this.state[i][k - 1];
          this.state[i][k] = 0;
          merged[k - 1] = true;
          this.moved = true;
        }
      }
    }

    if (this.moved) {
      this.born();
    }

    this.moved = false;
    this.check();
  }

  moveRight() {
    for (let i = 0; i < this.state.length; i++) {
      const merged = [false, false, false, false];

      for (let j = this.state[i].length - 2; j >= 0; j--) {
        if (this.state[i][j] === 0) {
          continue;
        }

        let k = j;

        while (k < this.state[i].length - 1 && this.state[i][k + 1] === 0) {
          this.state[i][k + 1] = this.state[i][k];
          this.state[i][k] = 0;
          this.moved = true;
          k++;
        }

        if (
          k < this.state[i].length - 1 &&
          this.state[i][k + 1] === this.state[i][k] &&
          !merged[k + 1] &&
          !merged[k]
        ) {
          this.state[i][k + 1] *= 2;
          this.score += this.state[i][k + 1];
          this.state[i][k] = 0;
          merged[k + 1] = true;
          this.moved = true;
        }
      }
    }

    if (this.moved) {
      this.born();
    }

    this.moved = false;
    this.check();
  }

  moveUp() {
    for (let j = 0; j < this.state[0].length; j++) {
      const merged = [false, false, false, false];

      for (let i = 1; i < this.state.length; i++) {
        if (this.state[i][j] === 0) {
          continue;
        }

        let k = i;

        while (k > 0 && this.state[k - 1][j] === 0) {
          this.state[k - 1][j] = this.state[k][j];
          this.state[k][j] = 0;
          this.moved = true;
          k--;
        }

        if (
          k > 0 &&
          this.state[k - 1][j] === this.state[k][j] &&
          !merged[k - 1] &&
          !merged[k]
        ) {
          this.state[k - 1][j] *= 2;
          this.score += this.state[k - 1][j];
          this.state[k][j] = 0;
          merged[k - 1] = true;
          this.moved = true;
        }
      }
    }

    if (this.moved) {
      this.born();
    }

    this.moved = false;
    this.check();
  }

  moveDown() {
    for (let j = 0; j < this.state[0].length; j++) {
      const merged = [false, false, false, false];

      for (let i = this.state.length - 2; i >= 0; i--) {
        if (this.state[i][j] === 0) {
          continue;
        }

        let k = i;

        while (k < this.state.length - 1 && this.state[k + 1][j] === 0) {
          this.state[k + 1][j] = this.state[k][j];
          this.state[k][j] = 0;
          this.moved = true;
          k++;
        }

        if (
          k < this.state.length - 1 &&
          this.state[k + 1][j] === this.state[k][j] &&
          !merged[k + 1] &&
          !merged[k]
        ) {
          this.state[k + 1][j] *= 2;
          this.score += this.state[k + 1][j];
          this.state[k][j] = 0;
          merged[k + 1] = true;
          this.moved = true;
        }
      }
    }

    if (this.moved) {
      this.born();
    }

    this.moved = false;
    this.check();
  }

  defineStep([rowIndex, columnIndex], direction) {
    const currentItem = this.state[rowIndex][columnIndex];
    const currentRow = this.state[rowIndex];
    const currentColumn = this.state.map((row) => row[columnIndex]);
    let step = 0;

    switch (direction) {
      case 'left':
        for (let i = columnIndex - 1; i >= 0; i--) {
          if (currentRow[i] === 0) {
            step++;
          } else if (currentRow[i] === currentItem) {
            return step + 1;
          } else {
            break;
          }
        }

        return step;
      case 'right':
        for (let i = columnIndex + 1; i < currentRow.length; i++) {
          if (currentRow[i] === 0) {
            step++;
          } else if (currentRow[i] === currentItem) {
            return step + 1;
          } else {
            break;
          }
        }

        return step;
      case 'up':
        for (let i = rowIndex - 1; i >= 0; i--) {
          if (currentColumn[i] === 0) {
            step++;
          } else if (currentColumn[i] === currentItem) {
            return step + 1;
          } else {
            break;
          }
        }

        return step;
      case 'down':
        for (let i = rowIndex + 1; i < currentColumn.length; i++) {
          if (currentColumn[i] === 0) {
            step++;
          } else if (currentColumn[i] === currentItem) {
            return step + 1;
          } else {
            break;
          }
        }

        return step;
    }
  }

  start() {
    this.born();
    this.born();
    this.status = 'playing';
  }

  restart() {
    this.state = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];
    this.status = 'idle';
    this.score = 0;
  }

  check() {
    if (this.score >= 2048) {
      this.status = 'win';

      return;
    }

    let possibleToMove = false;
    let current;

    for (let i = 0; i < this.state.length; i++) {
      if (this.state[i].includes(0)) {
        possibleToMove = true;

        return;
      }

      for (let j = 0; j < this.state[i].length; j++) {
        current = this.state[i][j];

        if (current === 0) {
          possibleToMove = true;

          return;
        }

        if (j < this.state[i].length - 1 && this.state[i][j + 1] === current) {
          possibleToMove = true;

          return;
        }

        if (i < this.state.length - 1 && this.state[i + 1][j] === current) {
          possibleToMove = true;

          return;
        }
      }
    }

    if (!possibleToMove) {
      this.status = 'lose';
    }
  }

  born() {
    const emptyCells = [];

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (this.state[i][j] === 0) {
          emptyCells.push([i, j]);
        }
      }
    }

    if (emptyCells.length === 0) {
      return;
    }

    const [row, col] =
      emptyCells[Math.floor(Math.random() * emptyCells.length)];
    const value = Math.random() < 0.1 ? 4 : 2;

    this.state[row][col] = value;
  }
}

module.exports = Game;
