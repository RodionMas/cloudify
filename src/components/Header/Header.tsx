import React from "react";
import style from "./Header.module.css";
import cloud from "../../assets/img/CloudsBlack.png";
import whiteLogo from '../../assets/img/CloudsWhite.png'
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAuth } from "../../selectors/selectors";

const Header: React.FC = () => {
  const { isAuth } = useSelector(selectAuth);
  return (
    <>
      {isAuth ? (
        <Link className={style.wrapper} to={"/home"}>
          <img className={style.logo} src={whiteLogo} alt="cloud" />
          <span className={style.logoTextAuth}>Cloudify</span>
        </Link>
      ) : (
        <Link className={style.wrapper} to={"/"}>
          <img className={style.logo} src={cloud} alt="cloud" />
          <span className={style.logoText}>Cloudify</span>
        </Link>
      )}
    </>
  );
};

export default Header;
