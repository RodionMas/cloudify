import React, { useCallback } from "react";
import style from "./FolderFiles.module.css";
import Search from "../UserRepo/Search/Search";
import { Link, useLocation, useParams } from "react-router-dom";
import arrow from "../../../assets/img/Chevron Down.png";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  changeDragDrop,
  fetchGetAllFiles,
  fetchGetFoldersFiles,
  SubfolderModal,
} from "../../../store/foldersSlice";
import { selectFolders, selectSubfolders } from "../../../selectors/selectors";
import createFolderImg from "../../../assets/img/Add Folder.png";
import uploadFilesImg from "../../../assets/img/File.png";
import Subfolders from "./Subfolders/Subfolders";
import FolderFilesArr from "./FolderFiles/FolderFilesArr";
import { newUrlFn } from "../../../tools/PathName";
import {
  FetchsubfoldersPackage,
  setFoldersURL,
} from "../../../store/subfolderSlice";
import { sortToolsSubfiles } from "../../../tools/SortTools";

const FolderFiles: React.FC = () => {
  const { foldername } = useParams();
  const sortBy = ["Name", "Folder", "File Size", "Changes"];
  const { pathname } = useLocation();
  const [sortArrow, setSortArrow] = React.useState(0);
  const [rotateArrow, setRotateArrow] = React.useState(false);
  const { colorForFolder } = useAppSelector(selectFolders);
  const { subfoldersURL } = useAppSelector(selectSubfolders);
  const dispatch = useAppDispatch();

  const count = pathname.split("/").length - 1;

  const handleGetFiles = useCallback(async () => {
    try {
      await dispatch(fetchGetAllFiles());
      await dispatch(fetchGetFoldersFiles(foldername));
    } catch (error) {
      console.warn(error);
    }
  }, [dispatch, foldername]);

  const handleGetSubfolders = useCallback(async () => {
    try {
      const parts = pathname.split("/");
      const userfolderIndex = parts.indexOf("userfolder");

      if (userfolderIndex !== -1) {
        const relevantPathParts = parts.slice(userfolderIndex + 1); // Убираем часть пути до "userfolder"
        const basePath = relevantPathParts.join("/");
        const encodedPath = basePath.replace(/\//g, "%2F");

        if (encodedPath !== subfoldersURL) {
          dispatch(setFoldersURL(basePath)); // Устанавливаем путь без "userfolder"
          await dispatch(FetchsubfoldersPackage(encodedPath)); // Используем закодированный путь
        }
      }
    } catch (error) {
      console.warn(error);
    }
  }, [pathname, subfoldersURL, dispatch]);

  const handleUploadFiles = () => {
    dispatch(changeDragDrop());
  };

  React.useEffect(() => {
    if (count === 3) {
      handleGetFiles();
    } else if (count > 3) {
      handleGetSubfolders();
    }
  }, [count, handleGetFiles, handleGetSubfolders]);

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
          <button onClick={handleUploadFiles} className={style.createFolderBtn}>
            Upload files to folder{" "}
            <img src={uploadFilesImg} alt="create folder" />
          </button>
          <Link className={style.linkAll} to={newUrlFn(pathname)}>
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
              onClick={() => {
                sortToolsSubfiles({
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
        {count === 3 ? <FolderFilesArr /> : <Subfolders />}
      </div>
    </section>
  );
};

export default React.memo(FolderFiles);