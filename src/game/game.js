import { Gamefield } from "../Gamefield/Gamefield";
import { M, N, blockSize, colors } from "../constants";
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
    let selectedBlock = null;
    this.field.flat().forEach((elem) => {
    const { x: elemX, y: elemY, width, height } = elem;
        if (
            x >= elemX &&
            x <= elemX + width &&
            y >= elemY &&
            y <= elemY + height
        ) {
            selectedBlock = elem;
        }
    });
    return selectedBlock;
  }

  addListener() {
    const canvasLeft = this.canvas.offsetLeft + this.canvas.clientLeft;
    const canvasTop = this.canvas.offsetTop + this.canvas.clientTop;
    this.canvas.addEventListener("click", (event) => {
      const x = event.pageX - canvasLeft;
      const y = event.pageY - canvasTop;
      this.selectBlock(x, y).color = null;
    this.gamefield.render(this.field)
    });
  }

  initGame() {
    this.setField();
    this.gamefield.render(this.field)
    this.addListener();
  }
}
