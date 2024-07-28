import React from "react";
import style from "./App.module.css";
import Home from "./components/Home/Home";
import { Route, Routes } from "react-router-dom";
import NonAuth from "./components/Home/NonAuth/NonAuth";
import Register from "./components/Home/Register/Register";
import Login from "./components/Home/Login/Login";

const App: React.FC = () => {
  return (
    <div className={style.wrapper}>
      <Routes>
      <Route path="/" element={<Home />}>
        <Route
          path="/"
          element={<NonAuth />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
      
    </div>
  );
};

export default App;
