import { Gamefield } from "../Gamefield/Gamefield";
import { M, N, blockSize, colors, minDelAmount } from "../constants";
import { RNG } from "../helpers/RNG";

export class Game {
  constructor(images) {
    // this.blocks = colors.map((color) => ({
    //   color,
    //   img: images.find(({ colorIndex }) => colorIndex === color),
    // }));
    this.canvas = document.getElementById("canvas");
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
          color: this.rng.getColor(),
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
          this.field[columnId][topRowId].color === value
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
          this.field[columnId][bottom].color === value
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
          if (this.field[rightColumnId][rowId].color === value) {
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
          this.field[leftColumnId][rowId].color === value
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
    const state = this.field[columnId][rowId].color;
    this.checkNeighbour(columnId, rowId, "top", state);
    this.checkNeighbour(columnId, rowId, "bottom", state);
    this.checkNeighbour(columnId, rowId, "right", state);
    this.checkNeighbour(columnId, rowId, "left", state);
  }

  findGroup(columnId, rowId) {
    const state = this.field[columnId][rowId].color;
    this.addToGroup(columnId, rowId, state);
    this.collectNeighbours(columnId, rowId);
  }

  removeBlocks() {
    if (this.removeIds.length >= minDelAmount) {
      this.removeIds.forEach(({ CI, RI }) => {
        this.field[CI][RI].color = null;
      });
    }
    this.initGroup();
    this.removeIds = [];
  }

  addListener() {
    const canvasLeft = this.canvas.offsetLeft + this.canvas.clientLeft;
    const canvasTop = this.canvas.offsetTop + this.canvas.clientTop;
    this.canvas.addEventListener("click", (event) => {
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
      this.gamefield.render(this.field);
    });
  }

  initGame() {
    this.setField();
    this.initGroup();
    this.gamefield.render(this.field);
    this.addListener();
  }
}
