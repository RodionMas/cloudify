import React from "react";
import style from "./CreateSubfolder.module.css";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { createSubfolderReducer, fetchCreateSubfolder, SubfolderModal } from "../../../store/FoldersSlice";
import { useLocation } from "react-router-dom";
import { selectFolders } from "../../../selectors/selectors";

const CreateSubfolder: React.FC = () => {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const [inputValue, setInputValue] = React.useState('');
  const { allFiles } = useAppSelector(selectFolders)
  console.log(allFiles)
  function createSubFolderFn() {
    const word = pathname.split('userfolder/')[1].split('/')[0];
    const subfolderData = {
      folderPath: word,
      name: inputValue
    };
    dispatch(createSubfolderReducer(subfolderData));
    dispatch(fetchCreateSubfolder(subfolderData));
  }
 
  return (
    <div className={style.wrapper}>
      <h1 className={style.title}>Create a subfolder</h1>
      <input
        onChange={e => setInputValue(e.target.value)}
        className={style.inp}
        type="text"
        placeholder="Enter a subfolder name and choose a color"
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