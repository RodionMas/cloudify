import React from "react";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { selectFolders } from "../../../../selectors/selectors";
import {
  changeMoveSelectedModal,
  fetchGetAllFiles,
  fetchGetMoverShowMore,
} from "../../../../store/foldersSlice";
import black from "../../../../assets/img/foldersColor/black.png";
import blue from "../../../../assets/img/foldersColor/blue.png";
import brown from "../../../../assets/img/foldersColor/brown.png";
import green from "../../../../assets/img/foldersColor/green.png";
import red from "../../../../assets/img/foldersColor/red.png";
import violet from "../../../../assets/img/foldersColor/violet.png";
import yellow from "../../../../assets/img/foldersColor/yellow.png";
import style from "./MovedAllFiles.module.css";
import { fetchAllMove, moveSelectedFiles, resetMoveFiles } from "../../../../store/moveSlice";
import { store } from "../../../../store/store";

const MovedAllFiles: React.FC = () => {
  const dispatch = useAppDispatch();

  const { foldersShowMore } = useAppSelector(selectFolders);

  React.useEffect(() => {
    dispatch(fetchGetMoverShowMore());
  }, [dispatch]);
  const handleMove = async (folderName: string) => {
    try {
      dispatch(moveSelectedFiles(folderName));
      // Дожидаемся обновления состояния (опционально через useSelector)
      let updatedMoveFiles = store.getState().moveReducer.moveFiles;
      await dispatch(fetchAllMove(updatedMoveFiles)).then(() => dispatch(resetMoveFiles()));
      await dispatch(fetchGetAllFiles())
      dispatch(changeMoveSelectedModal());
    } catch (error) {
      console.warn(error);
    }
  };
  return (
    <div className={style.wrapperFolder}>
      <div className={style.wrapperOverflow}>
        <h5 className={style.miniTitle}>Choose a folder</h5>
        {foldersShowMore.map((folder, i) => {
          return (
            <button
              onClick={() => {
                handleMove(folder.name);
              }}
              className={style.btnFolder}
              key={i}
            >
              {folder.color === "#ffb800" ? (
                <img className={style.packageImg} src={yellow} alt="package" />
              ) : folder.color === "#D23434" ? (
                <img className={style.packageImg} src={red} alt="package" />
              ) : folder.color === "#D23434" ? (
                <img className={style.packageImg} src={violet} alt="package" />
              ) : folder.color === "#0094FF" ? (
                <img className={style.packageImg} src={blue} alt="package" />
              ) : folder.color === "#39AA26" ? (
                <img className={style.packageImg} src={green} alt="package" />
              ) : folder.color === "#A76E2B" ? (
                <img className={style.packageImg} src={brown} alt="package" />
              ) : (
                <img className={style.packageImg} src={black} alt="package" />
              )}
              <span>{folder.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MovedAllFiles;
