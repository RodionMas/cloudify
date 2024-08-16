import React from "react";
import style from "./FolderFiles.module.css";
import Search from "../UserRepo/Search/Search";
import { Link, useLocation, useParams } from "react-router-dom";
// import openFolder from "../../../assets/img/OpenedFolder.png";
import arrow from "../../../assets/img/Chevron Down.png";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  changeDragDrop,
  fetchGetAllFiles,
  fetchGetFoldersFiles,
  FetchsubfoldersPackage,
  setFoldersURL,
  SubfolderModal,
} from "../../../store/FoldersSlice";
import { selectFolders } from "../../../selectors/selectors";
import OneFile from "../OneFile/OneFile";
import createFolderImg from "../../../assets/img/Add Folder.png";
import uploadFilesImg from "../../../assets/img/File.png";
import OneFolder from "../OneFolder/OneFolder";
import Subfolders from "./Subfolders/Subfolders";

const FolderFiles: React.FC = () => {
  const { foldername } = useParams();
  const sortBy = ["Name", "Folder", "File Size", "Changes"];
  const { pathname } = useLocation();
  const newUrlFn = () => {
    const lastSlashIndex = pathname.lastIndexOf("/");
    const newUrl = pathname.substring(0, lastSlashIndex);
    return newUrl;
  };
  const [sortDownArrow, setSortDownArrow] = React.useState(0);
  const { filesForPackage, foldersForPagckage } = useAppSelector(selectFolders);
  const { colorForFolder } = useAppSelector(selectFolders);
  const { subfoldersURL } = useAppSelector(selectFolders)
  const dispatch = useAppDispatch();
  const appDispatch = useAppDispatch();
  async function handleGetFiles() {
    try {
      await appDispatch(fetchGetAllFiles());
      await appDispatch(fetchGetFoldersFiles(foldername));
    } catch (error) {
      console.warn(error);
    }
  }
  const count = pathname.split("/").length - 1; //проверка чтобы послать запрос на subfolders или отобразить main папку
  async function handleGetSubfolders() {
    try {
       dispatch(setFoldersURL(pathname))
       await dispatch(FetchsubfoldersPackage(subfoldersURL))
    } catch (error) {
      console.warn(error);
    }
  }
  async function handleUploadFiles(){
    dispatch(changeDragDrop())
  }
  React.useEffect(() => {
    if (count === 3) {
      handleGetFiles();
    } else if (count > 3) {
      handleGetSubfolders()
    } 
  }, [pathname,subfoldersURL, dispatch, count, ]);
  return (
    <section className={style.wrapper}>
      <Search />
      <div className={style.box}>
        <h1 className={style.title}>{foldername}</h1>
        <div className={style.folderClickBox}>
          <button
            onClick={() => dispatch(SubfolderModal())}
            className={style.createFolderBtn}
          >
            Create Subfolder <img src={createFolderImg} alt="create folder" />
          </button>
          <button
            onClick={handleUploadFiles}
            className={style.createFolderBtn}
          >
            Upload files to folder <img src={uploadFilesImg} alt="create folder" />
          </button>
          <Link className={style.linkAll} to={newUrlFn()}>
            Back
          </Link>
        </div>
      </div>
      <div className={style.allFiles}>
        <div
          style={{ backgroundColor: colorForFolder }}
          className={style.color}
        ></div>
        <div className={style.sortBy}>
          {sortBy.map((sort, i) => (
            <button
              key={i}
              onClick={() => setSortDownArrow(i)}
              className={style.sortText}
            >
              {sort}{" "}
              {sortDownArrow === i && (
                <img
                  className={style.sortDownArrow}
                  src={arrow}
                  alt="Chevron Down"
                />
              )}{" "}
            </button>
          ))}
        </div>
        {count === 3 ? (
  <>
    {filesForPackage.map((item, i) => (
      <OneFile key={i} {...item} />
    ))}
    {foldersForPagckage.map((folder, i) => (
      <OneFolder key={i} folder={folder} />
    ))}
  </>
) : <Subfolders />}
      </div>
    </section>
  );
};

export default FolderFiles;
