import React from "react";
import style from "./FileManagementButtons.module.css";
import upload from "../../../../assets/img/upload.png";
import folder from "../../../../assets/img/Folder.png";

const FileManagementButtons: React.FC = () => {
  return (
    <div className={style.wrapper}>
      <button className={style.uload}>
        {" "}
        <img src={upload} alt="upload" />
        <span className={style.textBtn}>Upload File</span>
      </button>
      <button className={style.folder}>
        {" "}
        <img src={folder} alt="create-folder" />
        <span className={style.textBtn}>Create Folder</span>
      </button>
    </div>
  );
};

export default FileManagementButtons;
