import returnsmt from "./someFile";
import './styles/main.scss';
import { RNG } from "./helpers/RNG";

const canvas = document.getElementById('canvas');
canvas.style.height = '520px';
canvas.style.width = '520px';
canvas.style.border = '1px solid black';

const ctx = canvas.getContext("2d");

const rng = new RNG(50);
rng.initColors();

ctx.fillStyle = rng.getColor();
ctx.fillRect(25, 25, 100, 100);

let points = 0;

const button = document.getElementById('button');
const score = document.getElementById('score');
button.addEventListener('click', () => {
    points += 10;
    score.innerHTML = points;
    
    ctx.fillStyle = rng.getColor();
    ctx.fillRect(25, 25, 100, 100);
});

console.log(returnsmt());