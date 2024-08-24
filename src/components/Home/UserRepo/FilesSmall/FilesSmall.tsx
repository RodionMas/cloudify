import React from "react";
import style from "./FilesSmall.module.css";
import arrow from "../../../../assets/img/Chevron Down.png";
import { useSelector } from "react-redux";
import { selectFolders } from "../../../../selectors/selectors";
import { useAppDispatch } from "../../../../store/hooks";
import { fetchGetAllFiles } from "../../../../store/foldersSlice";
import OneFile from "../../OneFile/OneFile";
import { sortToolsFiles } from "../../../../tools/SortTools";

const FilesSmall: React.FC = () => {
  const sortBy = ["Name", "Folder", "File Size", "Last Changes"];
  const [sortArrow, setSortArrow] = React.useState(0);
  const [rotateArrow, setRotateArrow] = React.useState(false);
  const dispatch = useAppDispatch()
  const { allFiles } = useSelector(selectFolders);
  const { searchAllFiles } = useSelector(selectFolders);
  React.useEffect(() => {
    dispatch(fetchGetAllFiles())
  }, [dispatch])
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
             onClick={() => {
              sortToolsFiles({
                i,
                setSortArrow,
                setRotateArrow,
                sortArrow,
                rotateArrow,
                dispatch,
              });
            }}
             className={style.sortText}
           >
             {sort}{" "}
             {sortArrow === i && (
               <img
                 className={!rotateArrow ? style.sortDown : style.sortRotate}
                 src={arrow}
                 alt="Chevron Down"
               />
             )}{" "}
           </button>
          ))}
        </div>
        {searchAllFiles.length !== 0 ? 
          searchAllFiles
          .filter((_, i) => i <= 3)
          .map((item, i) => {
            return (
              <OneFile key={i} {...item} />
            );
          })
        :
         allFiles
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
