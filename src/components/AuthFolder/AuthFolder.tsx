import React from "react";
import style from "./Home.module.css";
import Header from "../Header/Header";
import cloudBlock from '../../assets/img/Rectangle 4.png'
import { Outlet } from "react-router-dom";

const AuthFolder: React.FC = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.authBlock}>
        <Header />
        <Outlet />
      </div>
      <div className={style.imageBlock}>
        <img className={style.cloudBlock} src={cloudBlock} alt="Rectangle" />
      </div>
    </div>
  );
};

export default AuthFolder;
