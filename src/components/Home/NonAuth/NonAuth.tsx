import React from "react";
import style from "./NonAuth.module.css";
import { Link } from "react-router-dom";
import ForwardArrow from '../../../assets/img/ForwardArrow.png'

const NonAuth: React.FC = () => {
  return (
    <div className={style.wrapper}>
      <h1 className={style.title}>Your personal cloud storage</h1>
      <p className={style.text}>
        Store your files in the cloud and access them from any device, anytime,
        anywhere in the world
      </p>
      <div className={style.registerBlock}>
        <Link className={style.register} to={`/register`}>Register</Link>
        <Link className={style.login} to={`/login`}>Log in</Link>
      </div>
      <a className={style.gitLink} href="#"><img className={style.forwardArrow} src={ForwardArrow} alt="" /> Read about Cloudify on Github</a>
    </div>
  );
};

export default NonAuth;
