import React from "react";
import style from "./Home.module.css";
import Header from "../Header/Header";
import NonAuth from "./NonAuth/NonAuth";
import cloudBlock from '../../assets/img/Rectangle 4.png'
import Register from "./Register/Register";
import Login from "./Login/Login";
import { Outlet } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.authBlock}>
        <Header />
        <Outlet />
        {/* <NonAuth /> */}
        {/* <Register /> */}
        {/* <Login /> */}
      </div>
      <div className={style.imageBlock}>
        <img className={style.cloudBlock} src={cloudBlock} alt="Rectangle" />
      </div>
    </div>
  );
};

export default Home;
