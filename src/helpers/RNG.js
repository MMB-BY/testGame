import { colors } from "../constants";

export class RNG {
  constructor() {}

  generateNumber(n) {
    return Math.floor(Math.random() * (n + 1));
  }

  getType() {
    const colorId = this.generateNumber(colors.length - 1);
    return colors[colorId];
  }
}
