import React from "react";
import style from "./FileActions.module.css";
import { Link } from "react-router-dom";
import Deleted from "../../../../assets/img/deleted.png";
import All from "../../../../assets/img/allFiles.png";
import Favorite from "../../../../assets/img/favorite.png";
import home from "../../../../assets/img/Home Page.png";

const FileActions: React.FC = () => {
  const categoryArr = [
    {
      name: "Home",
      image: home,
    },
    {
      name: "All Files",
      image: All,
    },
    {
      name: "Favorite",
      image: Favorite,
    },

    {
      name: "Deleted",
      image: Deleted,
    },
  ];
  return (
    <div className={style.wrapper}>
      {categoryArr.map((category, i) => {
        return (
          <Link
            key={i}
            className={style.linkCategory}
            to={`/home/${
              category.name === "All Files"
                ? "files"
                : category.name.toLowerCase()
            }`}
          >
            {" "}
            <img className={style.img} src={category.image} alt="" />{" "}
            {category.name}
          </Link>
        );
      })}
    </div>
  );
};

export default FileActions;
