import React from "react";
import style from "./FileActions.module.css";
import { Link } from "react-router-dom";
import Deleted from "../../../../assets/img/deleted.png";
import All from "../../../../assets/img/allFiles.png";
import Favorite from "../../../../assets/img/favorite.png";
import Recent from "../../../../assets/img/Replay.png";

const FileActions: React.FC = () => {
  const categoryArr = [
    {
      name: "All Files",
      image: All,
    },
    {
      name: "Favorite",
      image: Favorite,
    },
    {
      name: "Recent",
      image: Recent,
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
          <Link key={i} className={style.linkCategory} to={`/${category.name === 'All Files' ? 'Allfiles' : category.name}`}>
            {" "}
            <img className={style.img} src={category.image} alt="" /> {category.name}
          </Link>
        );
      })}
    </div>
  );
};

export default FileActions;
