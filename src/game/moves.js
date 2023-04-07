export class Moves {
  constructor(movesSet) {
    this.moves = movesSet;
    this.movesField = document.getElementById("moves");
  }

  set() {
    this.movesField.innerText = this.moves;
  }

  init() {
    if (this.moves < 5) this.moves = 5;
    if (this.moves > 100) this.moves = 100;
    this.set();
  }

  decrement() {
    this.moves--;
    this.set();
  }

  checkLose() {
    return this.moves <= 0;
  }
}
