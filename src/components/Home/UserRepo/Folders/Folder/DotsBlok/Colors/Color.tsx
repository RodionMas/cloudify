import React from "react";
// import style from "./Colors.module.css";
import style from '../DotsBlok.module.css'

interface ColorType {
  color: string;
}

const Color: React.FC<ColorType> = ({ color }) => {
    //для hover 
  const [isHovered, setIsHovered] = React.useState(false);
  return (
    <div
      className={style.color}
      style={{
        backgroundColor: `${color}`,
        boxShadow: isHovered ? `0px 2px 16px 0px ${color}` : '',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    />
  );
};

export default Color;
