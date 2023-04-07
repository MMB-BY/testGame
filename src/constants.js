
export const N = 10; //height
export const M = 9; //width
export const minDelAmount = 2;
export const blockSize = {
    width: 410 / M,
    height: 450 / N,
};

export const colors = [
    'green',
    'yellow',
    'red',
    'purple',
    'blue',
];

export const types = [
    ...colors,
    'bomb',
    'horizontal',
    'vertical',
    'nuke',
];

export const horizontalBonus = 6;
export const verticalBonus = 7;
export const bombBonus = 8;
export const nukeBonus = 10;
export const bombRadius = 2;
export const animDuration = 400;
export const canvasPadding = 25;