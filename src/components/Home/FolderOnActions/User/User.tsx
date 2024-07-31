import React from "react";
import style from "./User.module.css";
import userImg from "../../../../assets/img/User.png";
import logout from "../../../../assets/img/Logout.png";
import line from "../../../../assets/img/horizontalLine.png";
import { useSelector } from "react-redux";
import { selectAuth } from "../../../../selectors/selectors";
import { useAppDispatch } from "../../../../store/hooks";
import { fetchLogout } from "../../../../store/authSlice";

const User: React.FC = () => {
    const {username} = useSelector(selectAuth)
    const appDispatch = useAppDispatch()
  return (
    <div className={style.wrapper}>
      <div className={style.user}>
        <img className={style.userImg} src={userImg} alt="user" />
        <span>{username}</span>
      </div>
      <div className={style.logoutBlock}>
        <img src={line} alt="line" />
        {/* isAuth тоже нужно будет переключить */}
        <button onClick={() => appDispatch(fetchLogout())} className={style.logoutBtn}>
          {" "}
          <img src={logout} className={style.logoutImg} alt="logout" />
        </button>
      </div>
    </div>
  );
};

export default User;
