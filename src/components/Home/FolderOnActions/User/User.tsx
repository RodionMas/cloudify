import React from "react";
import style from "./User.module.css";
import userImg from "../../../../assets/img/User.png";
import logoutImg from "../../../../assets/img/Logout.png";
import line from "../../../../assets/img/horizontalLine.png";
import { useSelector } from "react-redux";
import { selectAuth } from "../../../../selectors/selectors";
import { useDispatch } from "react-redux";
import { changeLogout } from "../../../../store/FoldersSlice";


const User: React.FC = () => {
    const {username} = useSelector(selectAuth)
    const dispatch = useDispatch()
  return (
    <div className={style.wrapper}>
      <div className={style.user}>
        <img className={style.userImg} src={userImg} alt="user" />
        <span>{username}</span>
      </div>
      <div className={style.logoutBlock}>
        <img src={line} alt="line" />
        <button onClick={() => dispatch(changeLogout())} className={style.logoutBtn}>
          {" "}
          <img src={logoutImg} className={style.logoutImg} alt="logout" />
        </button>
      </div>
    </div>
  );
};

export default User;
