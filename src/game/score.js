export class Score {
  constructor(aimSet) {
    this.aim = aimSet;
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
    if (this.aim < 1) this.aim = 1;
    if (this.aim > 1000) this.aim = 1000;
    this.set();
  }

  increase() {
    this.score++;
    this.set();
  }

  checkWin() {
    return this.score >= this.aim;
  }
}
