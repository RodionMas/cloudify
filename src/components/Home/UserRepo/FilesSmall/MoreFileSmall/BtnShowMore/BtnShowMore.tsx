import React, { useState } from "react";
import style from "./BtnShowMore.module.css";
import forward from "../../../../../../assets/img/dots/Forward.png";
import ChooseFolder from "./ChooseFolder/ChooseFolder";
import { useAppDispatch } from "../../../../../../store/hooks";
import {
  changeRenameModal,
  fetchDownload,
  renameFile,
} from "../../../../../../store/foldersSlice";
import { useLocation } from "react-router-dom";

const BtnShowMore: React.FC<any> = React.memo(
  ({ name, image, deleteMove, props }) => {
    const dispatch = useAppDispatch();
    const { pathname } = useLocation();
    
    const [downloadError, setDownloadError] = useState<string | null>(null);

    async function renameFn(name: string) {
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

      const renameObjFn = {
        oldFileName: props.filename,
        filepath: props.filePath,
      };

      if (name === "Rename") {
        dispatch(changeRenameModal());
        dispatch(renameFile(renameObjFn));
      } else if (name === "Download") {
        try {
          const blob = await dispatch(fetchDownload(`${refreshPath()}%2F${props.filename}`)).unwrap();
          
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = props.filename;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
        } catch (error) {
          setDownloadError('Ошибка загрузки файла');
          console.error('Ошибка загрузки файла:', error);
        }
      }
    }

    return (
      <>
        <button
          onClick={() => {
            deleteMove(name);
            props.hideContentFn();
            renameFn(name);
          }}
          className={style.moreBox}
        >
          <img src={image} alt="item" />
          <span className={style.name}>
            {name}{" "}
            {name === "Move" && (
              <img className={style.img} src={forward} alt="forward" />
            )}{" "}
          </span>
          {name === "Move" && (
            <ChooseFolder filePath={props.filePath} filename={props.filename} />
          )}
        </button>
        {downloadError && <p>{downloadError}</p>}
      </>
    );
  }
);

export default BtnShowMore;