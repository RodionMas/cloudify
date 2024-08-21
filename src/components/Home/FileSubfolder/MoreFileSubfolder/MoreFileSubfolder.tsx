import React from 'react'
import { forwardRef, useState } from "react";
import ReactDOM from "react-dom";
import style from "../../UserRepo/FilesSmall/MoreFileSmall/MoreFileSmall.module.css";
import download from "../../../../assets/img/showMoreSmall/Download from the Cloud.png";
import move from "../../../../assets/img/showMoreSmall/Move.png";
import edit from "../../../../assets/img/showMoreSmall/Edit File.png";
import cash from "../../../../assets/img/showMoreSmall/Trash Can.png";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import {
  fetchGetAllFiles,
  fetchGetDeletedFiles,
  fetchGetFolder,
  fetchGetFoldersFiles,
  fetchMove,
} from "../../../../store/foldersSlice";
import { selectSubfolders } from "../../../../selectors/selectors";
import { useParams } from "react-router-dom";
import { FetchsubfoldersPackage } from "../../../../store/subfolderSlice";
import BtnShowMoreSub from './BtnShowMoreSub/BtnShowMoreSub';
const MoreFileSubfolder = React.memo(forwardRef<HTMLDivElement, any>((props, ref) => {
  const showMoreArr = [
    { name: "Download", image: download },
    { name: "Move", image: move },
    { name: "Rename", image: edit },
    { name: "Delete", image: cash },
  ];
  const [moveFiles, setMoveFiles] = useState<any>({
    source: props.filePath,
    target: `deleted/${props.filePath}`,
    files: [],
  });

  const dispatch = useAppDispatch();
  const { foldername } = useParams();
  const { subfoldersURL } = useAppSelector(selectSubfolders);

  async function deleteMove(item: string) {
    if (item === "Delete") {
      setMoveFiles((moveFiles.files = [...moveFiles.files, props.filename]));
      try {
        console.log('del')
        await dispatch(fetchMove(moveFiles));
        await dispatch(fetchGetAllFiles());
        // await dispatch(fetchGetFolder());
        // await dispatch(fetchGetFoldersFiles(foldername));
        await dispatch(fetchGetDeletedFiles())
        await dispatch(FetchsubfoldersPackage(subfoldersURL));
      } catch (error) {
        console.warn(error);
      }
    }
  }
  const menu = (
    <div ref={ref} className={style.wrapper} style={props.style}>
      {showMoreArr.map((item) => (
            <BtnShowMoreSub
              key={item.name}
              props={props}
              deleteMove={() => deleteMove(item.name)}
              {...item}
            />
          ))}
    </div>
  );

  return ReactDOM.createPortal(menu, document.body);
}));

export default MoreFileSubfolder;
