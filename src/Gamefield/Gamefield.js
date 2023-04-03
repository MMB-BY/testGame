import { M, N, blockSize, colors } from "../constants";
import { RNG } from "../helpers/RNG";

export class Gamefield {
  constructor(images) {
    this.blocks = colors.map((color) => ({
      color,
      img: images.find(({ colorIndex }) => colorIndex === color),
    }));
    this.canvas = document.getElementById("canvas");
    this.rng = new RNG();
  }

  render(field) {
    const ctx = this.canvas.getContext("2d");
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    const data = field.flat();
    data.forEach(({
        x,
        y,
        width,
        height,
        color,
    }) => {
        if (!color) return;
        const block = this.blocks.find((block) => block.color === color);
        const image = new Image(blockSize.width, blockSize.height);
        if (block.img) {
          image.src = block.img.src;
          ctx.drawImage(
            image,
            x,
            y,
            width,
            height,
          );
        }    
    });
  }
}
