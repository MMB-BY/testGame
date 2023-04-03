import { blockSize } from "../../constants";

export const loadImage = ({link, color}) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onerror = (e) => reject(`${link} failed to load`);
    img.onload = (e) => resolve(img);
    img.src = link;
    img.size = blockSize;
    img.colorIndex = color;
  });
};
