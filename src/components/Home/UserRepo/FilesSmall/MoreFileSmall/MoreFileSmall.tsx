import React from 'react'
import { forwardRef, useState } from "react";
import ReactDOM from "react-dom";
import style from "./MoreFileSmall.module.css";
import download from "../../../../../assets/img/showMoreSmall/Download from the Cloud.png";
import move from "../../../../../assets/img/showMoreSmall/Move.png";
import edit from "../../../../../assets/img/showMoreSmall/Edit File.png";
import cash from "../../../../../assets/img/showMoreSmall/Trash Can.png";
import recet from "../../../../../assets/img/showMoreSmall/Reset.png";
import { useAppDispatch, useAppSelector } from "../../../../../store/hooks";
import {
  fetchDeleteFile,
  fetchGetAllFiles,
  fetchGetDeletedFiles,
  fetchGetFolder,
  fetchGetFoldersFiles,
  fetchMove,
  fetchRecover,
} from "../../../../../store/foldersSlice";
import { selectFolders, selectSubfolders } from "../../../../../selectors/selectors";
import { useLocation, useParams } from "react-router-dom";
import BtnShowMore from "./BtnShowMore/BtnShowMore";
import { FetchFilesUserRes } from "../../../../../types/folderTypes";
import { FetchsubfoldersPackage } from "../../../../../store/subfolderSlice";
interface RecoverType {
  filename: string;
  filePath: string;
}
const MoreFileSmall = React.memo(forwardRef<HTMLDivElement, any>((props, ref) => {
  const showMoreArr = [
    { name: "Download", image: download },
    { name: "Move", image: move },
    { name: "Rename", image: edit },
    { name: "Delete", image: cash },
  ];
  const showMoreDeleted = [
    { name: "Recover", image: recet },
    { name: "Delete", image: cash },
  ];
  const [moveFiles, setMoveFiles] = useState<any>({
    source: props.filePath,
    target: `deleted/${props.filePath}`,
    files: [],
  });

  const dispatch = useAppDispatch();
  const { deletedFiles } = useAppSelector(selectFolders);
  const { foldername } = useParams();
  const { subfoldersURL } = useAppSelector(selectSubfolders);
  async function deleteMove(item: string) {
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
    if (item === "Delete") {
      setMoveFiles((moveFiles.files = [...moveFiles.files, props.filename]));
      try {
        await dispatch(fetchMove(moveFiles));
        await dispatch(fetchGetAllFiles());
        await dispatch(fetchGetFolder());
        await dispatch(FetchsubfoldersPackage(refreshPath()));
        await dispatch(fetchGetFoldersFiles(foldername));
        await dispatch(fetchGetDeletedFiles())
      } catch (error) {
        console.warn(error);
      }
    }
  }
  const {pathname} = useLocation();
  const isDeleted = pathname === "/home/deleted";
  const handleDeleteFile = async (delFile: FetchFilesUserRes[]) => {
    try {
      await dispatch(fetchDeleteFile({ delFile }));
      await dispatch(fetchGetDeletedFiles());
    } catch (error) {
      console.warn(error);
    }
  };

  const handleRecover = async (recover: RecoverType[]) => {
    try {
      await dispatch(fetchRecover(recover));
      await dispatch(fetchGetDeletedFiles());
    } catch (error) {
      console.warn(error);
    }
  };
  const menu = (
    <div ref={ref} className={style.wrapper} style={props.style}>
      {isDeleted
        ? showMoreDeleted.map((item) => (
            <button
              onClick={() => {
                if (item.name === "Delete") {
                  const delFile = deletedFiles.filter(
                    (deleteItem) => deleteItem.filename === props.filename
                  );
                  handleDeleteFile(delFile);
                } else if (item.name === "Recover") {
                  const recover = [
                    {
                      filePath: props.filePath,
                      filename: props.filename ? props.filename : "",
                    },
                  ];
                  handleRecover(recover);
                }
                props.hideContentFn();
              }}
              key={item.name}
              className={style.moreBox}
            >
              <img src={item.image} alt={item.name} />
              <span className={style.name}>{item.name}</span>
            </button>
          ))
        : showMoreArr.map((item) => (
            <BtnShowMore
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

export default MoreFileSmall;
