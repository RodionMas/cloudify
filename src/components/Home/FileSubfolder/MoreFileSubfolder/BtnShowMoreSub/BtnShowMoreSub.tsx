import React from "react";
import style from "../../../UserRepo/FilesSmall/MoreFileSmall/BtnShowMore/BtnShowMore.module.css";
import forward from "../../../../../assets/img/dots/Forward.png";

import {
  changeRenameModal,
  renameFile,
} from "../../../../../store/foldersSlice";
import { useAppDispatch } from "../../../../../store/hooks";
import ChooseFolder from "../../../UserRepo/FilesSmall/MoreFileSmall/BtnShowMore/ChooseFolder/ChooseFolder";

const BtnShowMoreSub: React.FC<any> = React.memo(
  ({ name, image, deleteMove, props }) => {
    const dispatch = useAppDispatch();
    function renameFn(name: string) {
      const renameObjFn = {
        oldFileName: props.filename,
        filepath: props.filePath,
      };
      if (name === "Rename") {
        dispatch(changeRenameModal());
        dispatch(renameFile(renameObjFn));
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

export default BtnShowMoreSub;
