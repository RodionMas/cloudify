import React from "react";
import style from "./User.module.css";
import userImg from "../../../../assets/img/User.png";
import logoutImg from "../../../../assets/img/Logout.png";
import line from "../../../../assets/img/horizontalLine.png";
import { selectAuth, selectFolders } from "../../../../selectors/selectors";
import { changeLogout } from "../../../../store/authSlice";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";

const User: React.FC = () => {
  const { username } = useAppSelector(selectAuth);
  const { err } = useAppSelector(selectFolders);
  const dispatch = useAppDispatch();
  return (
    <div className={style.wrapper}>
      <div className={style.user}>
        <img className={style.userImg} src={userImg} alt="user" />
        {err ? <span>???</span> : <span>{username}</span>}
      </div>
      <div className={style.logoutBlock}>
        <img src={line} alt="line" />
        <button
          onClick={() => dispatch(changeLogout())}
          className={style.logoutBtn}
        >
          {" "}
          <img src={logoutImg} className={style.logoutImg} alt="logout" />
        </button>
      </div>
    </div>
  );
};

export default User;
