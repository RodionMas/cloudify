// await dispatch(fetchColorFolder(colorFolder))
import React, { useEffect } from "react";
import style from '../DotsBlok.module.css';
import { useAppDispatch, useAppSelector } from "../../../../../../../store/hooks";
import { changeColorFolder, changeColorFolderName, fetchColorFolder } from "../../../../../../../store/foldersSlice";
import { selectFolders } from "../../../../../../../selectors/selectors";

interface ColorType {
  color: string;
  name: string;
}

const Color: React.FC<ColorType> = ({ color, name }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const dispatch = useAppDispatch();

  async function handleChangeColor() {
    dispatch(changeColorFolder(color));
    dispatch(changeColorFolderName(name));
  }

  return (
    <div
      className={style.color}
      onClick={() => handleChangeColor()}
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
