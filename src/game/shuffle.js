import { shuffleTimes } from "../constants";

export class Shuffle {
  constructor() {
    this.times = shuffleTimes;
    this.timesField = document.getElementById("shuffleTimes");
    this.shuffleButton = document.getElementById("shuffle");
  }

  set() {
    this.timesField.innerText = this.times;
  }

  init() {
    this.shuffleButton.style.display = "flex";
    this.shuffleButton.style.opacity = 1;
    this.set();
  }

  getShuffleButton() {
    return this.shuffleButton;
  }

  check() {
    if (this.times <= 0) {
      this.shuffleButton.style.opacity = 0.5;
      this.shuffleButton.replaceWith(this.shuffleButton.cloneNode(true));
    }
    return this.times <= 0;
  }

  decrement() {
    this.times--;
    this.set();
    this.check();
  }
}
