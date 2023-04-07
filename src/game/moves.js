export class Moves {
    constructor() {
      this.moves = 50;
      this.movesField = document.getElementById("moves");
    }
  
    set() {
      this.movesField.innerText = this.moves;
    }
  
    init() {
      this.moves = 50;
      this.set();
    }
  
    decrement() {
      this.moves--;
      this.set();
    }
  }
  