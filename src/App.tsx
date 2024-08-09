import React from "react";
import style from "./App.module.css";
import AuthFolder from "./components/AuthFolder/AuthFolder";
import { Route, Routes, Navigate } from "react-router-dom";
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
import DeletedPage from "./components/Home/DeletedPage/DeletedPage";
import FolderFiles from "./components/Home/FolderFiles/FolderFiles";

const App: React.FC = () => {
  const { isAuth } = useSelector(selectAuth);
  const appDispatch = useAppDispatch();

  React.useEffect(() => {
    appDispatch(fetchGetMe());
  }, [appDispatch]);
  return (
    <div className={isAuth ? style.wrapperHome : style.wrapperAuth}>
      <div className={style.container}>
        <Routes>
          <Route path="/" element={<AuthFolder />}>
            <Route index element={<NonAuth />} />
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
          <Route path="/home" element={<Home />}>
            <Route index element={<UserRepo />} />
            <Route path="/home/files" element={<AllFiles />} />
            <Route path="/home/userfolder/:subfolder" element={<FolderFiles />} />
            <Route path="/home/deleted" element={<DeletedPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
