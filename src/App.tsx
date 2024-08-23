import React, { Suspense } from "react";
import style from "./App.module.css";
import AuthFolder from "./components/AuthFolder/AuthFolder";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import NonAuth from "./components/AuthFolder/NonAuth/NonAuth";
import { useSelector } from "react-redux";
import { selectAuth, selectFolders } from "./selectors/selectors";
import Home from "./components/Home/Home";
import UserRepo from "./components/Home/UserRepo/UserRepo";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { fetchGetMe } from "./store/authSlice";
import Preloader from "./Preloader/Preloader";
import { lazy } from "react";
import FolderFiles from "./components/Home/FolderFiles/FolderFiles";

const App: React.FC = () => {
  const { isAuth } = useSelector(selectAuth);
  const appDispatch = useAppDispatch();
  const { loading } = useAppSelector(selectFolders);
  const navigatePath = useNavigate();
  const AllFiles = lazy(() => import("./components/Home/AllFiles/AllFiles"));
  // const FolderFiles = lazy(
  //   () => import("./components/Home/FolderFiles/FolderFiles")
  // );
  const DeletedPage = lazy(
    () => import("./components/Home/DeletedPage/DeletedPage")
  );
  const Register = lazy(
    () => import("./components/AuthFolder/Register/Register")
  );
  const Login = lazy(() => import("./components/AuthFolder/Login/Login"));

  React.useEffect(() => {
    appDispatch(fetchGetMe());
    if (!isAuth) {
      navigatePath("/");
    }
  }, [appDispatch]);
  return (
    <div className={isAuth ? style.wrapperHome : style.wrapperAuth}>
      {loading === "pending" && <Preloader />}
      <div className={style.container}>
        <Routes>
          <Route path="/" element={<AuthFolder />}>
            <Route index element={<NonAuth />} />
            <Route
              path="register"
              element={
                <Suspense>
                  <Register />
                </Suspense>
              }
            />
            <Route
              path="login"
              element={
                <Suspense>
                  <Login />
                </Suspense>
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
          <Route path="/home" element={<Home />}>
            <Route index element={<UserRepo />} />
            <Route
              path="/home/files"
              element={
                <Suspense>
                  <AllFiles />
                </Suspense>
              }
            />
            <Route path="/home/userfolder/:foldername/*" element={<FolderFiles />} />
            <Route
              path="/home/deleted"
              element={
                <Suspense>
                  <DeletedPage />
                </Suspense>
              }
            />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
