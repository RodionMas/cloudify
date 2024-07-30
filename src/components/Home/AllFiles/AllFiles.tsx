import React from "react";
import style from "./AllFiles.module.css";
import Search from "../UserRepo/Search/Search";
import { Link } from "react-router-dom";
import openFolder from "../../../assets/img/OpenedFolder.png";

const AllFiles: React.FC = () => {
  return (
    <section className={style.wrapper}>
      <Search />
      <div className={style.box}>
        <h1 className={style.title}>Files</h1>
        <Link className={style.linkAll} to={"/photos/all"}>
          To Folders <img className={style.linkImg} src={openFolder} alt="all" />
        </Link>
      </div>
    </section>
  );
};

export default AllFiles;
