import React from "react";
import style from "./DeletedPage.module.css";
import {
  selectDelete,
  selectFolders,
} from "../../../selectors/selectors";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import Search from "../UserRepo/Search/Search";
import deleteFolder from "../../../assets/img/dots/TrashCan.png";
import recoverFolder from "../../../assets/img/showMoreSmall/Reset.png";
import arrow from "../../../assets/img/Chevron Down.png";
import OneFile from "../OneFile/OneFile";
import {
  fetchDeleteFiles,
  fetchGetAmountData,
  fetchGetDeletedFiles,
} from "../../../store/FoldersSlice";
import { fetchDeleteSelected, fetchRecoverFiles } from "../../../store/deleteSlise";

const DeletedPage = () => {
  const sortBy = ["Name", "File Size", "Last Changes"];
  const [sortArrow, setSortArrow] = React.useState(0);
  const { deletedFiles } = useAppSelector(selectFolders);
  const { files } = useAppSelector(selectDelete);
  const appDispatch = useAppDispatch();
  const handleRecoverFiles = async () => {
    try {
      await appDispatch(fetchRecoverFiles(files))
      await appDispatch(fetchGetDeletedFiles());
    } catch (error) {
      console.warn(error)
    }
  }
  const handleDeleteSelected = async () => {
   try {
    await appDispatch(fetchDeleteSelected(files));
    await appDispatch(fetchGetDeletedFiles());
   } catch (error) {
    console.warn(error)
   }
  };
  const handleDeleteFiles = async () => {
    try {
      await appDispatch(fetchDeleteFiles({ deletedFiles }));
      await appDispatch(fetchGetAmountData());
    } catch (error) {
      console.error("Error creating folder:", error);
    }
  };
  React.useEffect(() => {
    appDispatch(fetchGetDeletedFiles());
  }, [appDispatch]);
  return (
    <section className={style.wrapper}>
      <Search />
      <div className={style.box}>
        <h1 className={style.title}>Deleted</h1>
        <div className={style.doBtn}>
          <button
            onClick={handleDeleteFiles}
            className={style.actionCheckbox}
          >
            Delete All{" "}
            <img className={style.linkImg} src={deleteFolder} alt="all" />
          </button>
          <button onClick={handleDeleteSelected} className={style.actionCheckbox}>
            Delete selected{" "}
            <img className={style.linkImg} src={deleteFolder} alt="all" />
          </button>
          <button
            onClick={handleRecoverFiles}
            className={style.actionCheckbox}
          >
            Recover selected{" "}
            <img className={style.linkImg} src={recoverFolder} alt="all" />
          </button>
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
        {deletedFiles.map((item) => {
          return <OneFile key={item.filename} {...item} />;
        })}
      </div>
    </section>
  );
};

export default DeletedPage;
