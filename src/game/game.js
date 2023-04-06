import { Gamefield } from "../Gamefield/Gamefield";
import {
  M,
  N,
  animDuration,
  blockSize,
  canvasPadding,
  minDelAmount,
} from "../constants";
import { RNG } from "../helpers/RNG";
import { Score } from "./score";

export class Game {
  constructor(images) {
    this.canvas = document.getElementById("canvas");
    this.score = new Score();
    this.rng = new RNG();
    this.gamefield = new Gamefield(images);
    this.field = [];
    this.group = new Array(M).fill(null).map(() => new Array(N).fill(null));
    this.removeIds = [];
  }

  initGroup() {
    this.group = new Array(M).fill(null).map(() => new Array(N).fill(null));
  }

  setField() {
    for (let i = 0; i < M; i++) {
      const column = [];
      for (let j = N - 1; j >= 0; j--) {
        column.push({
          x: blockSize.width * i,
          y: blockSize.height * j,
          width: blockSize.width,
          height: blockSize.height + blockSize.height * (1 / N),
          type: this.rng.getType(),
          move: 0,
          toRemove: false,
          scale: 1,
        });
      }
      this.field.push(column);
    }
  }

  selectBlock(x, y) {
    let pos = null;
    this.field.forEach((column, columnId) => {
      column.forEach((elem, rowId) => {
        const { x: elemX, y: elemY, width, height } = elem;
        if (
          x >= elemX &&
          x <= elemX + width &&
          y >= elemY &&
          y <= elemY + height
        ) {
          pos = {
            columnId,
            rowId,
          };
        }
      });
    });
    return pos;
  }

  checkGroup(columnId, rowId) {
    if (this.group[columnId][rowId]) {
      return false;
    }
    return true;
  }

  addToGroup(columnId, rowId, value) {
    this.group[columnId][rowId] = value;
  }

  checkNeighbour(columnId, rowId, direction, value) {
    switch (direction) {
      case "top":
        if (rowId === N - 1) return;
        const topRowId = rowId + 1;
        if (
          this.field[columnId][topRowId] &&
          this.field[columnId][topRowId].type === value
        ) {
          if (this.checkGroup(columnId, topRowId)) {
            this.addToGroup(columnId, topRowId, value);
            this.collectNeighbours(columnId, topRowId);
          }
        }
        break;
      case "bottom":
        if (rowId === 0) return;
        const bottom = rowId - 1;
        if (
          this.field[columnId][bottom] &&
          this.field[columnId][bottom].type === value
        ) {
          if (this.checkGroup(columnId, bottom)) {
            this.addToGroup(columnId, bottom, value);
            this.collectNeighbours(columnId, bottom);
          }
        }
        break;
      case "right":
        if (columnId === M - 1) return;
        const rightColumnId = columnId + 1;
        if (this.field[rightColumnId][rowId]) {
          if (this.field[rightColumnId][rowId].type === value) {
            if (this.checkGroup(rightColumnId, rowId)) {
              this.addToGroup(rightColumnId, rowId, value);
              this.collectNeighbours(rightColumnId, rowId);
            }
          }
        }
        break;
      case "left":
        if (columnId === 0) return;
        const leftColumnId = columnId - 1;
        if (
          this.field[leftColumnId][rowId] &&
          this.field[leftColumnId][rowId].type === value
        ) {
          if (this.checkGroup(leftColumnId, rowId)) {
            this.addToGroup(leftColumnId, rowId, value);
            this.collectNeighbours(leftColumnId, rowId);
          }
        }
        break;
    }
  }

  collectNeighbours(columnId, rowId) {
    const state = this.field[columnId][rowId].type;
    this.checkNeighbour(columnId, rowId, "top", state);
    this.checkNeighbour(columnId, rowId, "bottom", state);
    this.checkNeighbour(columnId, rowId, "right", state);
    this.checkNeighbour(columnId, rowId, "left", state);
  }

  findGroup(columnId, rowId) {
    const state = this.field[columnId][rowId].type;
    this.addToGroup(columnId, rowId, state);
    this.collectNeighbours(columnId, rowId);
  }

  removeBlocks() {
    if (this.removeIds.length >= minDelAmount) {
      this.removeIds.forEach(({ CI, RI }) => {
        this.field[CI][RI].toRemove = true;
        this.score.increase();
      });
      this.gamefield.animRemove(this.field);
      window.setTimeout(() => {
        this.updateField();
      }, animDuration / 2);
    }
    this.initGroup();
    this.removeIds = [];
  }

  updateField() {
    this.field.forEach((column, ci) => {
      const tcol = column.filter(({ toRemove }) => !toRemove);
      column.forEach((row, ri) => {
        if (tcol[ri]) {
          row.type = tcol[ri].type;
          row.move = row.y - tcol[ri].y;
          row.scale = 1;
          row.toRemove = false;
        } else {
          row.scale = 1;
          row.toRemove = false;
          row.type = this.rng.getType();
          row.move = blockSize.height * (ri + 2);
        }
      });
    });
    this.gamefield.animDrop(this.field);
  }

  addListener() {
    const canvasLeft =
      this.canvas.offsetLeft + this.canvas.clientLeft + canvasPadding / 2;
    const canvasTop =
      this.canvas.offsetTop + this.canvas.clientTop + canvasPadding / 2;
    this.canvas.addEventListener("click", (event) => {
      if (this.gamefield.animInProgress) return;
      const x = event.pageX - canvasLeft;
      const y = event.pageY - canvasTop;
      const { columnId, rowId } = this.selectBlock(x, y);
      if (columnId >= 0 && rowId >= 0) {
        this.findGroup(columnId, rowId);
        this.group.forEach((column, CI) => {
          column.forEach((row, RI) => {
            if (row) {
              this.removeIds.push({ CI, RI });
            }
          });
        });
        this.removeBlocks();
      }
      // this.gamefield.render(this.field);
    });
  }

  initGame() {
    this.score.init();
    this.setField();
    this.initGroup();
    this.gamefield.render(this.field);
    this.addListener();
  }
}
