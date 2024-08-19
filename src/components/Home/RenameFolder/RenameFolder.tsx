import React from "react";
import style from "./RenameFolder.module.css";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { changeRenameFolderModal, fetchGetFolder, fetchRenameFodler, renameNewNameFolder } from "../../../store/foldersSlice";
import { selectFolders } from "../../../selectors/selectors";


const RenameFolder: React.FC = () => {
  const dispatch = useAppDispatch();
  const { renameFolder } = useAppSelector(selectFolders)
  async function handleRemoveAndGet(){
    try {
        await dispatch(fetchRenameFodler(renameFolder));
        await dispatch(fetchGetFolder())
    } catch (error) {
        console.warn(error)
    }
  }
  return (
    <div className={style.wrapper}>
      <h1 className={style.title}>Rename</h1>
      <input
        onChange={(e) => {
            dispatch(renameNewNameFolder(e.target.value))
        }}
        className={style.inp}
        type="text"
        placeholder="Enter a folder name"
      />
      <div className={style.btnBox}>
        <button
          onClick={() => {
            dispatch(changeRenameFolderModal());
            handleRemoveAndGet()
          }}
          className={style.save}
        >
          Save
        </button>
        <button
          onClick={() => dispatch(changeRenameFolderModal())}
          className={style.cancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default RenameFolder;
