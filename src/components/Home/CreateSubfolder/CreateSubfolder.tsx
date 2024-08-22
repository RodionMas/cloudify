import React from "react";
import style from "./CreateSubfolder.module.css";
import { useAppDispatch } from "../../../store/hooks";
import { createSubfolderReducer, fetchCreateSubfolder, fetchGetFoldersFiles, SubfolderModal } from "../../../store/foldersSlice";
import { useLocation, useParams } from "react-router-dom";
import { FetchsubfoldersPackage } from "../../../store/subfolderSlice";

const CreateSubfolder: React.FC = () => {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const [inputValue, setInputValue] = React.useState('');
  const { foldername } = useParams()
  async function createSubFolderFn() {
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
    const word = pathname.split('userfolder/')[1].split('/');
    const result = word.join('/'); // Объединяем элементы массива с разделителем "/"
    const subfolderData = {
      folderPath: result,
      name: inputValue
    };
    dispatch(createSubfolderReducer(subfolderData));
    await dispatch(fetchCreateSubfolder(subfolderData));
    await dispatch(fetchGetFoldersFiles(foldername))
    await dispatch(FetchsubfoldersPackage(refreshPath()));
  }

  return (
    <div className={style.wrapper}>
      <h1 className={style.title}>Create a subfolder</h1>
      <input
        onChange={e => setInputValue(e.target.value)}
        className={style.inp}
        type="text"
        placeholder="Enter a subfolder name"
      />
      <div className={style.btnBox}>
        <button
          onClick={() => {
            dispatch(SubfolderModal());
            createSubFolderFn();
          }}
          className={style.create}
        >
          Create
        </button>
        <button
          onClick={() => dispatch(SubfolderModal())}
          className={style.cancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CreateSubfolder;