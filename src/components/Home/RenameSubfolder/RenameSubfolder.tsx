import React from "react";
import style from "./RenameSubfolder.module.css";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  changeModal,
  fetchRenameSubfolder,
  renameSubfolderNew,
} from "../../../store/subfolderSlice";
import { selectSubfolders } from "../../../selectors/selectors";
import { fetchGetFoldersFiles } from "../../../store/FoldersSlice";
import { useLocation, useParams } from "react-router-dom";
import { pathFn } from "../../../tools/PathName";

const RenameSubfolder: React.FC = () => {
  const dispatch = useAppDispatch();
  const { renameSubfolder } = useAppSelector(selectSubfolders);
  const { foldername } = useParams();
  console.log(foldername)
  const { pathname } = useLocation()
  async function handleRenameSubfolder() {
    try {
      console.log(renameSubfolder)
      await dispatch(fetchRenameSubfolder(renameSubfolder));
      await dispatch(fetchGetFoldersFiles(foldername));
      dispatch(changeModal());
    } catch (error) {
      console.warn(error);
    }
  }
  return (
    <div className={style.wrapper}>
      <h1 className={style.title}>Rename</h1>
      <input
        onChange={(e) => {
          dispatch(renameSubfolderNew(pathFn(pathname) + '/' + e.target.value));
        }}
        className={style.inp}
        type="text"
        placeholder="Enter a subfolder"
      />
      <div className={style.btnBox}>
        <button onClick={handleRenameSubfolder} className={style.save}>
          Save
        </button>
        <button
          onClick={() => {
            dispatch(changeModal());
          }}
          className={style.cancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default RenameSubfolder;
