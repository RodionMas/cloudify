import React from "react";
import style from "./App.module.css";
import AuthFolder from "./components/AuthFolder/AuthFolder";
import { Route, Routes, useNavigate } from "react-router-dom";
import NonAuth from "./components/AuthFolder/NonAuth/NonAuth";
import Register from "./components/AuthFolder/Register/Register";
import Login from "./components/AuthFolder/Login/Login";
import { useSelector } from "react-redux";
import { selectAuth } from "./selectors/selectors";
import Home from "./components/Home/Home";
import UserRepo from "./components/Home/UserRepo/UserRepo";
import AllFiles from "./components/Home/AllFiles/AllFiles";
import { useAppDispatch } from "./store/hooks";
import { fetchGetMe } from "./store/authSlice";

const App: React.FC = () => {
  const { isAuth } = useSelector(selectAuth);
  const appDispatch = useAppDispatch()
  const navigate = useNavigate();
  React.useEffect(() => {
    appDispatch(fetchGetMe())
    if (isAuth) {
      navigate("/home");
    } else {
      navigate("/");
    }
  }, [isAuth]);
  return (
    <div className={isAuth ? style.wrapperHome : style.wrapperAuth}>
      <div className={style.container}>
        <Routes>
          <Route path="/" element={<AuthFolder />}>
            <Route path="/" element={<NonAuth />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Route>
          <Route path="/home" element={<Home />}>
            <Route path="/home" element={<UserRepo />} />
            <Route path="/home/Allfiles" element={<AllFiles />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
};

export default App;
