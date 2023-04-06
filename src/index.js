import returnsmt from "./someFile";
import './styles/main.scss';
import { loadAssets } from "./helpers/assetsLoading/loadAssets";
import { Game } from "./game/game";

const init = async () => {
    const images = await loadAssets();
    const game = new Game(images);
    game.initGame();
};

init();


const button = document.getElementById('button');
button.addEventListener('click', () => {
    points += 10;
    score.innerHTML = points;
});
console.log(returnsmt());