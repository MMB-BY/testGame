import { animDuration, blockSize, colors } from "../constants";
import { RNG } from "../helpers/RNG";

export class Gamefield {
  constructor(images) {
    this.blocks = colors.map((color) => ({
      color,
      img: images.find(({ colorIndex }) => colorIndex === color),
    }));
    this.canvas = document.getElementById("canvas");
    this.rng = new RNG();
    this.animInProgress = false;
  }

  tickDrop(data, time) {
    const deltaTime = new Date().getTime() - time;
    data.forEach((elem) => {
      if (elem.move > 0) {
        elem.y += (elem.move / animDuration) * deltaTime;
        elem.move -= (elem.move / animDuration) * deltaTime;
      } else {
        elem.move = 0;
      }
    });
    this.render(data);
    if (deltaTime < animDuration) {
      requestAnimationFrame(() => this.tickDrop(data, time));
    } else {
      this.animInProgress = false;
    }
  }

  animDrop(field) {
    this.animInProgress = true;
    const time = new Date().getTime();
    const data = field.flat();
    data.forEach((elem) => {
      if (elem.move > 0) {
        elem.y -= elem.move;
      }
    });
    requestAnimationFrame(() => this.tickDrop(data, time));
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
