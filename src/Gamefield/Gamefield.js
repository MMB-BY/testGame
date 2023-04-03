import { M, N, blockSize, colors } from "../constants";
import { RNG } from "../helpers/RNG";

export class Gamefield {
    constructor(images) {
        this.blocks = colors.map((color) => ({
            color,
            img: images.find(({colorIndex}) => colorIndex === color),
        }));
        this.ctx = document.getElementById('canvas').getContext("2d");
        this.rng = new RNG();
    }
    
    fillFIeld() {
    for (let i = 0; i< M; i++) {
        for (let j = 0; j < N; j++) {
            const color = this.rng.getColor();
            const block = this.blocks.find((block) => block.color === color);
            const image = new Image(blockSize.width, blockSize.height);
            image.src = block.img.src;
            this.ctx.drawImage(
                image,
                blockSize.width * j,
                blockSize.height * i,
                blockSize.width,
                blockSize.height,
            );
        }
    }
}

}