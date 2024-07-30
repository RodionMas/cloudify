import React from "react";
// import style from "./Colors.module.css";
import style from '../DotsBlok.module.css'
import Color from "./Color";

interface ColorsType {
  colors: string[];
}

const Colors: React.FC<ColorsType> = ({ colors }) => {
  return (
    <div className={style.wrapperColors}>
      <span className={style.text}>Choose a color</span>
      <div className={style.colorsBox}>
        {colors.map((color, i) => <Color key={i} color={color} />)}
      </div>
    </div>
  );
};

export default Colors;
