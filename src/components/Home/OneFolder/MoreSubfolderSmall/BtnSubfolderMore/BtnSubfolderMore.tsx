import React from "react";
import style from "./BtnSubfolderMore.module.css";
import { useAppDispatch } from "../../../../../store/hooks";
import { changeModal, fetchsubfolderDel, FetchsubfoldersPackage, renameSubfolderOld } from "../../../../../store/subfolderSlice";
import { useLocation, useParams } from "react-router-dom";
import { pathFn } from "../../../../../tools/PathName";
import { fetchGetFoldersFiles } from "../../../../../store/foldersSlice";


const BtnSubfolderMore: React.FC<any> = React.memo(
  ({ name, image, deleteMove, props }) => {
    const { pathname } = useLocation()
    const { foldername } = useParams();
    const dispatch = useAppDispatch();
    function renameFn(name: string) {
      if (name === "Rename") {
        dispatch(changeModal())
        dispatch(renameSubfolderOld(`${pathFn(pathname)}/${props.name}`))
      } 
    }
    async function handleDelSubfolder (){
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
      if(name === 'Delete'){
        await dispatch(fetchsubfolderDel({folderPath: `${pathFn(pathname)}/${props.name}`}))
        await dispatch(fetchGetFoldersFiles(foldername));
        await dispatch(FetchsubfoldersPackage(refreshPath()))
      }
    }
   
    return (
      <>
        <button
          onClick={() => {
            deleteMove(name);
            props.hideContentFn();
            renameFn(name);
            handleDelSubfolder()
          }}
          className={style.moreBox}
        >
          <img src={image} alt="item" />
          <span className={style.name}>
            {name}{" "}
          </span>
        </button>
      </>
    );
  }
);

export default BtnSubfolderMore;

