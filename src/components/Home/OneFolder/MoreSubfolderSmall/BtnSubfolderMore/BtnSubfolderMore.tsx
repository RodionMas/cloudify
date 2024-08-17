import React from "react";
import style from "./BtnSubfolderMore.module.css";
import { useAppDispatch } from "../../../../../store/hooks";
import { changeModal, renameSubfolderOld } from "../../../../../store/subfolderSlice";
import { useLocation } from "react-router-dom";
import { pathFn } from "../../../../../tools/PathName";


const BtnSubfolderMore: React.FC<any> = React.memo(
  ({ name, image, deleteMove, props }) => {
    const { pathname } = useLocation()
    
    const dispatch = useAppDispatch();
    function renameFn(name: string) {
      if (name === "Rename") {
        dispatch(changeModal())
        dispatch(renameSubfolderOld(`${pathFn(pathname)}/${props.name}`))
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
          </span>
        </button>
      </>
    );
  }
);

export default BtnSubfolderMore;

