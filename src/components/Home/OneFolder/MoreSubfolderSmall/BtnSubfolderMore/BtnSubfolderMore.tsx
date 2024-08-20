import React from "react";
import style from "./BtnSubfolderMore.module.css";
import { useAppDispatch } from "../../../../../store/hooks";
import { changeModal, fetchsubfolderDel, renameSubfolderOld } from "../../../../../store/subfolderSlice";
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
    
      if(name === 'Delete'){
        await dispatch(fetchsubfolderDel({folderPath: `${pathFn(pathname)}/${props.name}`}))
        await dispatch(fetchGetFoldersFiles(foldername));
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

