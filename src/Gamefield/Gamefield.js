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
        elem.y = Math.round(elem.y);
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

  tickRemove(data, time) {
    const deltaTime = new Date().getTime() - time;
    data.forEach((elem) => {
      let removed = false;
      if (!elem.toRemove) return;
      const frameDelta = (1 / (animDuration / 2)) * deltaTime / 10;
      if (elem.scale > 0 && !removed) {
        elem.scale -= frameDelta;
      } else {
        removed = true;
      }
    });
    this.render(data);
    if (deltaTime < (animDuration / 2)) {
      requestAnimationFrame(() => this.tickRemove(data, time));
    } else {
      this.animInProgress = false;
    }
  }

  animDrop(field) {
    const time = new Date().getTime();
    const data = field.flat();
    data.forEach((elem) => {
      if (elem.move > 0) {
        elem.y -= elem.move;
      }
    });
    requestAnimationFrame(() => this.tickDrop(data, time));
  }
  
  animRemove(field) {
    const time = new Date().getTime();
    const data = field.flat();
    requestAnimationFrame(() => this.tickRemove(data, time));
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
        scale,
    }) => {
        if (!color) return;
        const block = this.blocks.find((block) => block.color === color);
        const image = new Image(blockSize.width, blockSize.height);
        if (block.img) {
          image.src = block.img.src;
          ctx.drawImage(
            image,
            x + (width * (0.5 - scale / 2)),
            y + (height * (0.5 - scale / 2)),
            width * scale,
            height * scale,
          );
        }    
    });
  }
}
