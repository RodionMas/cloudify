import React from "react";
import style from "./FileManagementButtons.module.css";
import upload from "../../../../assets/img/upload.png";
import folder from "../../../../assets/img/Folder.png";
import { useDispatch } from "react-redux";
import { changeDragDrop, changeFolderModal } from "../../../../store/foldersSlice";

const FileManagementButtons: React.FC = () => {
  const dispatch = useDispatch()
  return (
    <div className={style.wrapper}>
      <button  onClick={() => dispatch(changeDragDrop())} className={style.upload}>
        {" "}
        <img src={upload} alt="upload" />
        <span className={style.textBtn}>Upload File</span>
      </button>
      <button onClick={() => dispatch(changeFolderModal())} className={style.folder}>
        {" "}
        <img src={folder} alt="create-folder" />
        <span className={style.textBtn}>Create Folder</span>
      </button>
    </div>
  );
};

export default React.memo(FileManagementButtons);
