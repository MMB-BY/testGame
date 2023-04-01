export class RNG {
    constructor(colorsAmount) {
        this.colors = new Array(colorsAmount).fill(0);
    }

    generateNumber(n) {
        return Math.floor(Math.random() * (n + 1));
    }

    generateColor() {
        const colorsAmount = 16 ** 6;
        return this.generateNumber(colorsAmount).toString(16);
    }

    initColors() {
        this.colors = this.colors.map(() => {
            return this.generateColor();
        });
    }

    getColor() {
        const colorId = this.generateNumber(this.colors.length);
        return `#${this.colors[colorId]}`;
    }
}