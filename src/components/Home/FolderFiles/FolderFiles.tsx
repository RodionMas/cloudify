import React from "react";
import style from "./FolderFiles.module.css";
import Search from "../UserRepo/Search/Search";
import { Link, useParams } from "react-router-dom";
import openFolder from "../../../assets/img/OpenedFolder.png";
import arrow from "../../../assets/img/Chevron Down.png";
import { useAppDispatch } from "../../../store/hooks";
import { fetchGetAllFiles } from "../../../store/FoldersSlice";
import { useSelector } from "react-redux";
import { selectFolders } from "../../../selectors/selectors";
import OneFile from "../OneFile/OneFile";

const FolderFiles: React.FC = () => {
  const { subfolder } = useParams()
  const sortBy = ["Name", "Folder", "File Size", "Last Changes"];
  const [sortArrow, setSortArrow] = React.useState(0);
  const { allFiles } = useSelector(selectFolders)
  const appDispatch = useAppDispatch()
  React.useEffect(() => {
    appDispatch(fetchGetAllFiles())
  }, [appDispatch])
  return (
    <section className={style.wrapper}>
      <Search />
      <div className={style.box}>
        <h1 className={style.title}>{subfolder}</h1>
        <Link className={style.linkAll} to={"/photos/all"}>
          To Folders <img className={style.linkImg} src={openFolder} alt="all" />
        </Link>
      </div>
      <div className={style.allFiles}>
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
        {allFiles.filter(item => item.filePath === subfolder).map((item, i) => {
          return (
            <OneFile key={i} {...item} />
          );
        })}
      </div>
    </section>
  );
};

export default FolderFiles;
