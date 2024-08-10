import React from "react";
import style from "./FolderFiles.module.css";
import Search from "../UserRepo/Search/Search";
import { Link, useParams } from "react-router-dom";
// import openFolder from "../../../assets/img/OpenedFolder.png";
import arrow from "../../../assets/img/Chevron Down.png";
import { useAppDispatch } from "../../../store/hooks";
import { fetchGetAllFiles, SubfolderModal } from "../../../store/FoldersSlice";
import { useSelector } from "react-redux";
import { selectFolders } from "../../../selectors/selectors";
import OneFile from "../OneFile/OneFile";
import createFolderImg from '../../../assets/img/Add Folder.png'

const FolderFiles: React.FC = () => {
  const { foldername } = useParams()
  const sortBy = ["Name", "Folder", "File Size", "Last Changes"];
  const [sortArrow, setSortArrow] = React.useState(0);
  const { allFiles } = useSelector(selectFolders)
  const { colorForFolder } = useSelector(selectFolders)
  const dispatch = useAppDispatch()
  const appDispatch = useAppDispatch()
  React.useEffect(() => {
    appDispatch(fetchGetAllFiles())
  }, [appDispatch])
  return (
    <section className={style.wrapper}>
      <Search />
      <div className={style.box}>
        <h1 className={style.title}>{foldername}</h1>
        <div className={style.folderClickBox}>
        <button onClick={() => dispatch(SubfolderModal())} className={style.createFolderBtn}>Create folder <img src={createFolderImg} alt="create folder" /></button>
        <Link className={style.linkAll} to={"/home"}>
          Back
          {/* <img className={style.linkImg} src={openFolder} alt="all" /> */}
        </Link>
        </div>
      </div>
      <div className={style.allFiles}>
      <div style={{backgroundColor: colorForFolder}} className={style.color}></div>
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
        {allFiles.filter(item => item.filePath === foldername).map((item, i) => {
          return (
            <OneFile key={i} {...item} />
          );
        })}
      </div>
    </section>
  );
};

export default FolderFiles;
