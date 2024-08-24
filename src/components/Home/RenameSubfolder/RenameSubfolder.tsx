import React from "react";
import style from "./RenameSubfolder.module.css";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  changeModal,
  fetchRenameSubfolder,
  FetchsubfoldersPackage,
  renameSubfolderNew,
} from "../../../store/subfolderSlice";
import { selectSubfolders } from "../../../selectors/selectors";
import { fetchGetFoldersFiles } from "../../../store/foldersSlice";
import { useLocation, useParams } from "react-router-dom";
import { pathFn } from "../../../tools/PathName";
interface Subfolder {
  name: string;
  size: string;
  lastModified: {
    day: Date;
    time: Date;
  };
}
const RenameSubfolder: React.FC = () => {
  const dispatch = useAppDispatch();
  const { renameSubfolder } = useAppSelector(selectSubfolders);
  const [checkMessage, setCheckMessage] = React.useState(false);
  const subfoldersForPackage = useAppSelector(selectSubfolders).subfoldersForPackage as any;
  const { foldername } = useParams();
  const { pathname } = useLocation();

  async function handleRenameSubfolder() {
    const refreshPath = () => {
      const path = pathname;
      const parts = path.split("/");
      const index = parts.indexOf("userfolder");

      if (index !== -1) {
        const result = parts.slice(index + 1).join("/");
        const encodedPath = result.replace(/\//g, "%2F");
        return encodedPath;
      }
    };

    try {
      await dispatch(FetchsubfoldersPackage(refreshPath()));
      const str = renameSubfolder.newName;
      const lastSlashIndex = str.lastIndexOf("/");
      const lastPart = str.substring(lastSlashIndex + 1);
      const check = subfoldersForPackage.every(
        (subfolder: Subfolder) => subfolder.name !== lastPart
      );
      if (check) {
        console.log(check)
        await dispatch(fetchRenameSubfolder(renameSubfolder));
        await dispatch(fetchGetFoldersFiles(foldername));
        dispatch(changeModal());
      } else {
        console.log(check)
        setCheckMessage(true);
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
          dispatch(renameSubfolderNew(pathFn(pathname) + "/" + e.target.value));
        }}
        className={style.inp}
        type="text"
        placeholder="Enter a subfolder"
      />
      {checkMessage && (
        <span className={style.subMessage}>
          A subfolder with the same name already exists
        </span>
      )}
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