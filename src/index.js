import "./styles/main.scss";
import { loadAssets } from "./helpers/assetsLoading/loadAssets";
import { Game } from "./game/game";
import { displayStartScreen } from "./helpers/displayStartScreen";
import { displayGameScreen } from "./helpers/displayGameScreen";

const init = async (aim, steps) => {
  displayGameScreen();
  const images = await loadAssets();
  const game = new Game(images, aim, steps);
  game.initGame();
};

const startButton = document.getElementById("gameStart");
const restartButton = document.getElementById("restart");
startButton.addEventListener("click", () => {
  const aim = document.getElementById("aimSet").value;
  const steps = document.getElementById("stepsSet").value;
  init(aim, steps);
});
restartButton.addEventListener("click", () => {
  displayStartScreen();
  document.getElementById("restart").style.display = "none";
});
