import React from "react";
import style from "./RenameFolder.module.css";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  changeRenameFolderModal,
  fetchGetFolder,
  fetchRenameFodler,
  renameNewNameFolder,
} from "../../../store/foldersSlice";
import { selectFolders } from "../../../selectors/selectors";

const RenameFolder: React.FC = () => {
  const dispatch = useAppDispatch();
  const { renameFolder } = useAppSelector(selectFolders);
  const [checkMessage, setCheckMessage] = React.useState(false);
  const { folders } = useAppSelector(selectFolders);
  async function handleRemoveAndGet() {
    try {
      const checkFolders = folders.every(
        (folder) => folder.name !== renameFolder.newName
      );
      if (checkFolders) {
        await dispatch(fetchRenameFodler(renameFolder));
        await dispatch(fetchGetFolder());
        dispatch(changeRenameFolderModal());
      } else {
        setCheckMessage((prev) => (prev = true));
      }
    } catch (error) {
      console.warn(error);
    }
  }
  return (
    <div className={style.wrapper}>
      <h1 className={style.title}>Rename</h1>
      <input
        onChange={(e) => {
          dispatch(renameNewNameFolder(e.target.value));
        }}
        className={style.inp}
        type="text"
        placeholder="Enter a folder name"
      />
      {checkMessage && (
        <span className={style.messageCheck}>
          A folder with the same name already exists
        </span>
      )}
      <div className={style.btnBox}>
        <button
          onClick={() => {
            handleRemoveAndGet();
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
