import React from "react";
import style from "./FilesSmall.module.css";
import arrow from "../../../../assets/img/Chevron Down.png";
import { useSelector } from "react-redux";
import { selectFolders } from "../../../../selectors/selectors";
import { useAppDispatch } from "../../../../store/hooks";
import { fetchGetAllFiles } from "../../../../store/foldersSlice";
import OneFile from "../../OneFile/OneFile";

const FilesSmall: React.FC = () => {
  const sortBy = ["Name", "Folder", "File Size", "Last Changes"];
  const [sortArrow, setSortArrow] = React.useState(0);
  const appDispatch = useAppDispatch()
  const { allFiles } = useSelector(selectFolders);
 
  React.useEffect(() => {
    appDispatch(fetchGetAllFiles())
  }, [])
  return (
    <div className={style.wrapper}>
      <div className={style.box}>
        <h1 className={style.title}>Files</h1>
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
