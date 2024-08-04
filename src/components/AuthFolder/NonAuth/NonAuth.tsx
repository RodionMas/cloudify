import React from "react";
import style from "./NonAuth.module.css";
import { Link, useNavigate } from "react-router-dom";
import ForwardArrow from "../../../assets/img/ForwardArrow.png";
import { useSelector } from "react-redux";
import { selectAuth, selectFolders } from "../../../selectors/selectors";

const NonAuth: React.FC = () => {
  const { logout } = useSelector(selectFolders);
  const { isAuth } = useSelector(selectAuth);
  const navigate = useNavigate();
  React.useEffect(() => {
    if (isAuth && logout) {
      navigate("/home");
    }
  }, [isAuth, navigate, logout]);
  return (
    <div className={style.wrapper}>
      <h1 className={style.title}>Your personal cloud storage</h1>
      <p className={style.text}>
        Store your files in the cloud and access them from any device, anytime,
        anywhere in the world
      </p>
      <div className={style.registerBlock}>
        <Link className={style.register} to={`/register`}>
          Register
        </Link>
        <Link className={style.login} to={`/login`}>
          Log in
        </Link>
      </div>
      <a
        className={style.gitLink}
        rel="noopener noreferrer"
        target="_blank"
        href="https://github.com/RodionMas/cloudify"
      >
        <img className={style.forwardArrow} src={ForwardArrow} alt="" /> Read
        about Cloudify on Github
      </a>
    </div>
  );
};

export default NonAuth;
