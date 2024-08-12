import React from "react";
import style from "./AllFiles.module.css";
import Search from "../UserRepo/Search/Search";
import arrow from "../../../assets/img/Chevron Down.png";
import moveSelectedImg from "../../../assets/img/showMoreSmall/Move.png";
import moveDeletedImg from "../../../assets/img/showMoreSmall/Trash Can.png";
import { useAppDispatch } from "../../../store/hooks";
import { fetchGetAllFiles } from "../../../store/FoldersSlice";
import { useSelector } from "react-redux";
import { selectFolders } from "../../../selectors/selectors";
import OneFile from "../OneFile/OneFile";

const AllFiles: React.FC = () => {
  const sortBy = ["Name", "Folder", "File Size", "Last Changes"];
  const [sortArrow, setSortArrow] = React.useState(0);
  const { allFiles } = useSelector(selectFolders);
  const [filesArr, setFilesArr] = React.useState([])
  const appDispatch = useAppDispatch();

  React.useEffect(() => {
    appDispatch(fetchGetAllFiles());
  }, [appDispatch]);
  return (
    <section className={style.wrapper}>
      <Search />
      <div className={style.box}>
        <h1 className={style.title}>Files</h1>
        <div className={style.btnAllBox}>
          <button className={style.btnAll}>
            Delete selected{" "}
            <img className={style.linkImg} src={moveDeletedImg} alt="deleted all" />
          </button>
          <button className={style.btnAll}>
            Move selected{" "}
            <img className={style.linkImg} src={moveSelectedImg} alt="moved all" />
          </button>
          <button className={style.btnAll}>Cancel</button>
        </div>
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
        {allFiles.map((item, i) => {
          return <OneFile filesArr={filesArr} setFilesArr={setFilesArr} key={i} {...item} />;
        })}
      </div>
    </section>
  );
};

export default AllFiles;
