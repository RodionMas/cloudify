import React from "react";
import style from "./CreateSubfolder.module.css";
import { useAppDispatch } from "../../../store/hooks";
import { createSubfolderReducer, fetchCreateSubfolder, fetchGetFoldersFiles, SubfolderModal } from "../../../store/FoldersSlice";
import { useLocation, useParams } from "react-router-dom";

const CreateSubfolder: React.FC =  () => {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const [inputValue, setInputValue] = React.useState('');
  const { foldername } = useParams()
  async function createSubFolderFn() {
    const word = pathname.split('userfolder/')[1].split('/')[0];
    const subfolderData = {
      folderPath: word,
      name: inputValue
    };
    dispatch(createSubfolderReducer(subfolderData));
    await dispatch(fetchCreateSubfolder(subfolderData));
    await dispatch(fetchGetFoldersFiles(foldername))
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