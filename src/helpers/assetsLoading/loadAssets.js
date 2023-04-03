import { getAssetsData } from "./getAssetsData";
import { loadImage } from "./loadImage";

export const loadAssets = () => {
  const imgs = getAssetsData();
  const assetsLoaded = imgs.map(data =>
      loadImage(data)
    );
  
  return Promise.all(assetsLoaded);
}