import React from "react";
import style from "./Logout.module.css";
import { useSelector } from "react-redux";
import { selectAuth } from "../../../selectors/selectors";
import { useAppDispatch } from "../../../store/hooks";
import { changeLogout, fetchLogout } from "../../../store/authSlice";
import { useNavigate } from "react-router-dom";

const Logout: React.FC = () => {
  const { logout } = useSelector(selectAuth);
  const appDispatch = useAppDispatch();
  const navigate = useNavigate();
  const logoutFn = () => {
    appDispatch(changeLogout());
    appDispatch(fetchLogout()).then(() => navigate("/"));
    
  };
  return (
    <>
      {logout && (
        <div className={style.wrapper}>
          <h2 className={style.title}>
            Are you sure you want to log out of this account?
          </h2>
          <div className={style.btnBlock}>
            <button onClick={() => logoutFn()} className={style.logout}>
              Log out
            </button>
            <button
              onClick={() => appDispatch(changeLogout())}
              className={style.cancel}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Logout;
