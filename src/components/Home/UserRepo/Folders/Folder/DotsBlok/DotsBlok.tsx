import React from "react";
import style from "./DotsBlok.module.css";
import { useSelector } from "react-redux";
import { selectFolders } from "../../../../../../selectors/selectors";
import Forward from '../../../../../../assets/img/dots/Forward.png'

const DotsBlok: React.FC = () => {
  const { dots } = useSelector(selectFolders);
  return (
    <div className={style.wrapper}>
      {dots.map((item, i) => {
        return (
          <button className={style.btn}>
            {" "}
            <img className={style.img} src={item.image} alt="category" />{" "}
            <span className={style.name}>{item.name}</span>
            {item.color && <img className={style.forward} src={Forward} alt="Forward" />}
          </button>
        );
      })}
    </div>
  );
};

export default DotsBlok;
