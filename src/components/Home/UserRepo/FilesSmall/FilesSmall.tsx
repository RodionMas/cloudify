import React from "react";
import style from "./FilesSmall.module.css";
import arrow from "../../../../assets/img/Chevron Down.png";
import { Link } from "react-router-dom";
import showAll from "../../../../assets/img/all.png";
import { useSelector } from "react-redux";
import { selectAuth, selectFolders } from "../../../../selectors/selectors";
import { useAppDispatch } from "../../../../store/hooks";
import { fetchGetAllFiles } from "../../../../store/FoldersSlice";
import OneFile from "../../OneFile/OneFile";

const FilesSmall: React.FC = () => {
  const sortBy = ["Name", "File Size", "Last Changes"];
  const [sortArrow, setSortArrow] = React.useState(0);
  const { username } = useSelector(selectAuth)
  const appDispatch = useAppDispatch()
  const { allFiles } = useSelector(selectFolders);
 
  React.useEffect(() => {
    appDispatch(fetchGetAllFiles(username))
  }, [username, appDispatch])
  return (
    <div className={style.wrapper}>
      <div className={style.box}>
        <h1 className={style.title}>Files</h1>
        <Link className={style.linkAll} to={"/photos/all"}>
          Show All <img className={style.linkImg} src={showAll} alt="all" />
        </Link>
      </div>
      <div className={style.fileContainer}>
        <div className={style.sortBy}>
          {sortBy.map((sort, i) => (
            <button
              key={i}
              onClick={() => setSortArrow(i)}
              className={style.sortText}
            >
              {sort}{" "}
              {sortArrow === i && (
                <img
                  className={style.sortDown}
                  src={arrow}
                  alt="Chevron Down"
                />
              )}{" "}
            </button>
          ))}
        </div>
        {allFiles
          .filter((_, i) => i <= 3)
          .map((item, i) => {
            return (
              <OneFile key={i} {...item} />
            );
          })}
      </div>
    </div>
  );
};

export default FilesSmall;
