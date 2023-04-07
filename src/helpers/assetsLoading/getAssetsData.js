import blueImg from "../../assets/blue.png";
import greenImg from "../../assets/green.png";
import purpleImg from "../../assets/purple.png";
import redImg from "../../assets/red.png";
import yellowImg from "../../assets/yellow.png";
import bomb from "../../assets/bomb.png";
import horizontalArrow from "../../assets/horizontalArrow.png";
import verticalArrow from "../../assets/verticalArrow.png";
import nuke from "../../assets/nuke.png";

export const getAssetsData = () => {
  return [
    {
      link: blueImg,
      type: "blue",
    },
    {
      link: greenImg,
      type: "green",
    },
    {
      link: purpleImg,
      type: "purple",
    },
    {
      link: redImg,
      type: "red",
    },
    {
      link: yellowImg,
      type: "yellow",
    },
    {
      link: bomb,
      type: "bomb",
    },
    {
      link: horizontalArrow,
      type: "horizontal",
    },
    {
      link: verticalArrow,
      type: "vertical",
    },
    {
      link: nuke,
      type: "nuke",
    },
  ];
};
