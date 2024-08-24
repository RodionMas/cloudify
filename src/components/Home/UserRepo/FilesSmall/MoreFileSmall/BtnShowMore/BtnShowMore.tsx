import React, { useState } from "react";
import style from "./BtnShowMore.module.css";
import forward from "../../../../../../assets/img/dots/Forward.png";
import ChooseFolder from "./ChooseFolder/ChooseFolder";
import { useAppDispatch } from "../../../../../../store/hooks";
import {
  changeRenameModal,
  renameFile,
} from "../../../../../../store/foldersSlice";
import { useLocation } from "react-router-dom";
import axios from '../../../../../../instanceAxios'

const BtnShowMore: React.FC<any> = React.memo(
  ({ name, image, deleteMove, props }) => {
    const dispatch = useAppDispatch();
    const { pathname } = useLocation();
    const [downloadError, setDownloadError] = useState<string | null>(null);
    async function renameFn(name: string) {
      const renameObjFn = {
        oldFileName: props.filename,
        filepath: props.filePath,
      };
      if (name === "Rename") {
        dispatch(changeRenameModal());
        dispatch(renameFile(renameObjFn));
      }
    }
    async function handleDownload() {
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
        const pathDownload = `${refreshPath()}%2F${props.filename}`
        const response = await axios.get(`/files/download?fileName=${!refreshPath() ? props.filePath + '%2F' + props.filename : pathDownload}`, {
          headers: {
            'Content-Type': 'application/octet-stream',
          },
          responseType: 'blob',
          withCredentials: true,
        });
    
        // Создаем URL для загрузки файла
        const url = window.URL.createObjectURL(response.data);
        const a = document.createElement("a");
        a.href = url;
        a.download = props.filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      } catch (error) {
        setDownloadError("Ошибка загрузки файла");
        console.error("Ошибка загрузки файла:", error);
      }
    }
    return (
      <>
        <button
          onClick={() => {
            deleteMove(name);
            props.hideContentFn();
            renameFn(name);
            if (name === "Download") {
              handleDownload();
            }
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
