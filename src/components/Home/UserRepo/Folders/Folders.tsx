import React from "react";
import style from "./Folders.module.css";
import Folder from "./Folder/Folder";

const Folders: React.FC = () => {
  return (
    <div className={style.wrapper}>
      <h1 className={style.title}>Folders</h1>
      <div className={style.grid}>
        <Folder />
        <Folder />
      </div>
    </div>
  );
};

export default Folders;
