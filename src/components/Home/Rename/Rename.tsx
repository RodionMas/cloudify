import React from "react";
import style from "./Rename.module.css";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  changeRenameModal,
  fetchGetAllFiles,
  fetchGetFoldersFiles,
  fetchRenameFile,
} from "../../../store/foldersSlice";
import { selectFolders } from "../../../selectors/selectors";
import { useParams } from "react-router-dom";
interface newFileNameType {
  newFileName: string;
}

const Rename: React.FC = () => {
  const dispatch = useAppDispatch();
  const { renameObj } = useAppSelector(selectFolders);
  const [renameInp, setRenameInp] = React.useState<newFileNameType>(renameObj);
  const { foldername } = useParams();
  const handleRename = async () => {
    try {
      await dispatch(fetchRenameFile(renameInp));
      await dispatch(fetchGetAllFiles());
      await dispatch(fetchGetFoldersFiles(foldername));
      dispatch(changeRenameModal());
    } catch (error) {
      console.warn(error);
    }
  };
  React.useEffect(() => {}, [renameObj]);
  return (
    <div className={style.wrapper}>
      <h1 className={style.title}>Rename</h1>
      <input
        onChange={(e) => {
          const lastDotIndex: any = renameObj.oldFileName?.lastIndexOf(".");
          const extension = renameObj.oldFileName?.substring(lastDotIndex);
          setRenameInp({
            ...renameInp,
            newFileName: `${e.target.value}${extension}`,
          });
        }}
        className={style.inp}
        type="text"
        placeholder="Enter a file name and choose a color"
      />
      <div className={style.btnBox}>
        <button
          onClick={() => {
            handleRename();
          }}
          className={style.save}
        >
          Save
        </button>
        <button
          onClick={() => dispatch(changeRenameModal())}
          className={style.cancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Rename;
