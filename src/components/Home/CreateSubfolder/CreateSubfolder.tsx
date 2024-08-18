import React from "react";
import style from "./CreateSubfolder.module.css";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { createSubfolderReducer, fetchCreateSubfolder, fetchGetFoldersFiles, SubfolderModal } from "../../../store/FoldersSlice";
import { useLocation, useParams } from "react-router-dom";
import { selectSubfolders } from "../../../selectors/selectors";
import { FetchsubfoldersPackage } from "../../../store/subfolderSlice";

const CreateSubfolder: React.FC =  () => {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const [inputValue, setInputValue] = React.useState('');
  const { foldername } = useParams()
  const { subfoldersURL } = useAppSelector(selectSubfolders)
  async function createSubFolderFn() {
    const word = pathname.split('userfolder/')[1].split('/');
    const result = word.join('/'); // Объединяем элементы массива с разделителем "/"
    const subfolderData = {
      folderPath: result,
      name: inputValue
    };
    dispatch(createSubfolderReducer(subfolderData));
    await dispatch(fetchCreateSubfolder(subfolderData));
    await dispatch(fetchGetFoldersFiles(foldername))
    await  dispatch(FetchsubfoldersPackage(subfoldersURL));
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