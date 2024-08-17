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
  FetchsubfoldersPackage,
} from "../../../../../store/FoldersSlice";
import { selectFolders } from "../../../../../selectors/selectors";
import { useLocation, useParams } from "react-router-dom";
import BtnShowMore from "./BtnShowMore/BtnShowMore";
import { FetchFilesUserRes } from "../../../../../types/folderTypes";
interface RecoverType {
  filename: string;
  filePath: string;
}
const MoreFileSmall = forwardRef<HTMLDivElement, any>((props, ref) => {
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
  const { subfoldersURL } = useAppSelector(selectFolders);
  async function deleteMove(item: string) {
    if (item === "Delete") {
      setMoveFiles((moveFiles.files = [...moveFiles.files, props.filename]));
      try {
        await dispatch(fetchMove(moveFiles));
        await dispatch(fetchGetAllFiles());
        await dispatch(fetchGetFolder());
        await dispatch(fetchGetFoldersFiles(foldername));
        await dispatch(fetchGetDeletedFiles())
        await dispatch(FetchsubfoldersPackage(subfoldersURL));
      } catch (error) {
        console.warn(error);
      }
    }
  }
  const location = useLocation();
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
      {location.pathname === "/home/deleted"
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
              key={item.name} // Используем имя как ключ
              className={style.moreBox}
            >
              <img src={item.image} alt={item.name} />
              <span className={style.name}>{item.name}</span>
            </button>
          ))
        : showMoreArr.map((item) => (
            <BtnShowMore
              props={props}
              deleteMove={deleteMove}
              key={item.name} // Используем имя как ключ
              {...item}
            />
          ))}
    </div>
  );

  return ReactDOM.createPortal(menu, document.body);
});

export default MoreFileSmall;
