import returnsmt from "./someFile";
import './styles/main.scss';
import { RNG } from "./helpers/RNG";
import { Gamefield } from "./Gamefield/Gamefield";
import { loadAssets } from "./helpers/assetsLoading/loadAssets";

const canvas = document.getElementById('canvas');
canvas.style.border = '1px solid black';

const init = async () => {
    const images = await loadAssets();
    const gamefield = new Gamefield(images);
    gamefield.fillFIeld();
};

init();

let points = 0;

const button = document.getElementById('button');
const score = document.getElementById('score');
button.addEventListener('click', () => {
    points += 10;
    score.innerHTML = points;
});
console.log(returnsmt());