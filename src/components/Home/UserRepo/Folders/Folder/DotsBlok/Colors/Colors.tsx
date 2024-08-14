import React from "react";
// import style from "./Colors.module.css";
import style from '../DotsBlok.module.css'
import Color from "./Color";


interface ColorsType {
  colors: string[];
  name: string;
}

const Colors: React.FC<ColorsType> = ({ name, colors }) => {
  return (
    <div className={style.wrapperColors}>
      <span className={style.text}>Choose a color</span>
      <div className={style.colorsBox}>
        {colors.map((color, i) => <Color name={name} key={i} color={color} />)}
      </div>
    </div>
  );
};

export default Colors;
