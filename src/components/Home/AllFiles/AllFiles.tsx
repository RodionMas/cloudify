import React from "react";
import style from "./AllFiles.module.css";
import Search from "../UserRepo/Search/Search";
import arrow from "../../../assets/img/Chevron Down.png";
import moveSelectedImg from "../../../assets/img/showMoreSmall/Move.png";
import moveDeletedImg from "../../../assets/img/showMoreSmall/Trash Can.png";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  changeMoveSelectedModal,
  fetchGetAllFiles,
  fetchGetDeletedFiles,
} from "../../../store/foldersSlice";
import { selectFolders } from "../../../selectors/selectors";
import OneFile from "../OneFile/OneFile";
import MovedAllFiles from "./MovedAllFiles/MovedAllFiles";
import { useClickOutside } from "../../../tools/UseClickOutside";
import { fetchDelCheckbox, moveSelectedFiles, resetMoveFiles } from "../../../store/moveSlice";
import { store } from "../../../store/store";
import { sortToolsFiles } from "../../../tools/SortTools";

const AllFiles: React.FC = () => {
  const sortBy = ["Name", "Folder", "File Size", "Last Changes"];
  const [sortArrow, setSortArrow] = React.useState(0);
  const [rotateArrow, setRotateArrow] = React.useState(false);
  const { allFiles } = useAppSelector(selectFolders);
  const { searchAllFiles } = useAppSelector(selectFolders);
  const { moveSelectedModal } = useAppSelector(selectFolders);
  const dispatch = useAppDispatch();
  const hideRef = React.useRef<HTMLButtonElement | null>(null);
  const menuRef = React.useRef<HTMLDivElement | null>(null);

  useClickOutside([hideRef, menuRef], () => {
    if (moveSelectedModal) {
      dispatch(changeMoveSelectedModal());
    }
  });

  async function handleDeleteChebox() {
    try {
      dispatch(moveSelectedFiles("deleted"));
      const updateFilePath = store.getState().moveReducer.moveFiles;
      await dispatch(fetchDelCheckbox(updateFilePath)).then(() => dispatch(resetMoveFiles()));
      await dispatch(fetchGetAllFiles());
      await dispatch(fetchGetDeletedFiles());
    } catch (error) {
      console.warn(error);
    }
  }

  React.useEffect(() => {
    dispatch(fetchGetAllFiles());
  }, [dispatch]);

  return (
    <section className={style.wrapper}>
      <Search />
      <div className={style.box}>
        <h1 className={style.title}>Files</h1>
        <div className={style.btnAllBox}>
          <button onClick={handleDeleteChebox} className={style.btnAll}>
            Delete selected{" "}
            <img
              className={style.linkImg}
              src={moveDeletedImg}
              alt="deleted all"
            />
          </button>
          <button
            ref={hideRef}
            onClick={() => dispatch(changeMoveSelectedModal())}
            className={style.btnAll}
          >
            Move selected{" "}
            <img
              className={style.linkImg}
              src={moveSelectedImg}
              alt="moved all"
            />
          </button>
          {moveSelectedModal && (
            <div ref={menuRef}>
              <MovedAllFiles />
            </div>
          )}
        </div>
      </div>
      <div className={style.allFiles}>
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
        {searchAllFiles.length !== 0
          ? searchAllFiles.map((item, i) => (
            <OneFile
              key={`${item.filename}-${i}`}
              {...item}
            />
          ))
          : allFiles.map((item, i) => (
            <OneFile
              key={`${item.filename}-${i}`}
              {...item}
            />
          ))}
      </div>
    </section>
  );
};

export default AllFiles;