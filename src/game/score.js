export class Score {
  constructor() {
    this.aim = 50;
    this.score = 0;
    this.scoreField = document.getElementById("score");
    this.pointsField = document.getElementById("points");
  }

  set() {
    this.scoreField.style.transform = `translateX(-${
      100 - (this.score / this.aim) * 100
    }%)`;
    this.pointsField.innerText = this.score;
  }

  init() {
    this.score = 0;
    this.set();
  }

  increase() {
    this.score++;
    this.set();
  }
}
