import React from "react";
import style from "./Rename.module.css";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  changeRenameModal,
  fetchGetAllFiles,
  fetchGetFoldersFiles,
  fetchRenameFile,
  fetchSearchFiles,
} from "../../../store/foldersSlice";
import { selectFolders } from "../../../selectors/selectors";
import { useLocation, useParams } from "react-router-dom";
import { FetchsubfoldersPackage } from "../../../store/subfolderSlice";
interface newFileNameType {
  newFileName: string;
}

const Rename: React.FC = () => {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation()
  const { renameObj } = useAppSelector(selectFolders);
  const [renameInp, setRenameInp] = React.useState<newFileNameType>(renameObj);
  const { inpValue } = useAppSelector(selectFolders);
  const { foldername } = useParams();
  const handleRename = async () => {
    const refreshPath = () => {
      const path = pathname
        const parts = path.split("/"); // Разбиваем строку на массив по "/"
        const index = parts.indexOf("userfolder"); // Находим индекс "userfolder"
  
        if (index !== -1) {
          const result = parts.slice(index + 1).join("/"); // Забираем все элементы после "userfolder" и соединяем их обратно в строку
          const encodedPath = result.replace(/\//g, "%2F");
          return encodedPath;
        }
    } 
    try {
      
      await dispatch(fetchRenameFile(renameInp));
      await dispatch(fetchGetAllFiles());
      await dispatch(fetchGetFoldersFiles(foldername));
      await dispatch(FetchsubfoldersPackage(refreshPath()))
      await dispatch(fetchSearchFiles(inpValue))
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
        placeholder="Enter a file name"
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
