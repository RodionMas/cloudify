import React from "react";
import style from "./BtnShowMore.module.css";
import forward from "../../../../../../assets/img/dots/Forward.png";
import ChooseFolder from "./ChooseFolder/ChooseFolder";
import { useAppDispatch } from "../../../../../../store/hooks";
import {
  changeRenameModal,
  fetchGetFoldersFiles,
  renameFile,
} from "../../../../../../store/foldersSlice";
import { useLocation } from "react-router-dom";

const BtnShowMore: React.FC<any> = React.memo(
  ({ name, image, deleteMove, props }) => {
    const dispatch = useAppDispatch();
    const { pathname } = useLocation()
   
    
    function renameFn(name: string) {

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

      const renameObjFn = {
        oldFileName: props.filename,
        filepath: props.filePath,
      };
      if (name === "Rename") {
        dispatch(changeRenameModal());
        dispatch(renameFile(renameObjFn));
      } else if(name === "Download"){
        dispatch(fetchGetFoldersFiles(`${refreshPath()}%2F${props.filename}`))
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
      </>
    );
  }
);

export default BtnShowMore;
