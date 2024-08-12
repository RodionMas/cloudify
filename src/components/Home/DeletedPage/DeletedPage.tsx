import React from "react";
import style from "./DeletedPage.module.css";
import { useSelector } from "react-redux";
import { selectAuth, selectFolders } from "../../../selectors/selectors";
import { useAppDispatch } from "../../../store/hooks";
import Search from "../UserRepo/Search/Search";
import deleteFolder from "../../../assets/img/dots/TrashCan.png";
import arrow from "../../../assets/img/Chevron Down.png";
import OneFile from "../OneFile/OneFile";
import {
  fetchDeleteFiles,
  fetchGetAmountData,
  fetchGetDeletedFiles,
} from "../../../store/FoldersSlice";

const DeletedPage = () => {
  const sortBy = ["Name", "File Size", "Last Changes"];
  const [sortArrow, setSortArrow] = React.useState(0);
  const { username } = useSelector(selectAuth);
  const { deletedFiles } = useSelector(selectFolders);
  const appDispatch = useAppDispatch();
  const handleDeleteFiles = async () => {
    try {
      await appDispatch(fetchDeleteFiles({ username, deletedFiles }));
      await appDispatch(fetchGetAmountData());
    } catch (error) {
      console.error('Error creating folder:', error);
    }   } 
  React.useEffect(() => {
    appDispatch(fetchGetDeletedFiles());
  }, [username, appDispatch]);
  return (
    <section className={style.wrapper}>
      <Search />
      <div className={style.box}>
        <h1 className={style.title}>Deleted</h1>
        <button
          onClick={() =>  handleDeleteFiles()}
          className={style.delAll}
        >
          Delete All{" "}
          <img className={style.linkImg} src={deleteFolder} alt="all" />
        </button>
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
        {deletedFiles.map((item, i) => {
          return <OneFile key={i} {...item} />;
        })}
      </div>
    </section>
  );
};

export default DeletedPage;
