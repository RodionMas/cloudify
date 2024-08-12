import { forwardRef, useState } from "react";
import ReactDOM from "react-dom";
import style from "./MoreFileSmall.module.css";
import download from "../../../../../assets/img/showMoreSmall/Download from the Cloud.png";
import link from "../../../../../assets/img/showMoreSmall/Cloud Link.png";
import bookmark from "../../../../../assets/img/showMoreSmall/Bookmark.png";
import move from "../../../../../assets/img/showMoreSmall/Move.png";
import info from "../../../../../assets/img/showMoreSmall/Info.png";
import edit from "../../../../../assets/img/showMoreSmall/Edit File.png";
import cash from "../../../../../assets/img/showMoreSmall/Trash Can.png";
import recet from "../../../../../assets/img/showMoreSmall/Reset.png";
import { useAppDispatch } from "../../../../../store/hooks";
import {
  fetchDeleteFile,
  fetchGetAllFiles,
  fetchGetDeletedFiles,
  fetchGetFolder,
  fetchMove,
  fetchRecover,
} from "../../../../../store/FoldersSlice";
import { useSelector } from "react-redux";
import { selectAuth, selectFolders } from "../../../../../selectors/selectors";
import { useLocation } from "react-router-dom";
import BtnShowMore from "./BtnShowMore/BtnShowMore";

const MoreFileSmall = forwardRef<HTMLDivElement, any>((props, ref) => {
  const showMoreArr = [
    { name: "Download", image: download },
    // { name: "Create Link", image: link },
    // { name: "Favourite", image: bookmark },
    { name: "Move", image: move },
    { name: "Info", image: info },
    { name: "Rename", image: edit },
    { name: "Delete", image: cash },
  ];
  const showMoreDeleted = [
    { name: "Recover", image: recet },
    { name: "Delete", image: cash },
  ];
  const { username } = useSelector(selectAuth);
  const [movedObjForFetch, setMovedObjForFetch] = useState<any>({
    source: props.filePath,
    target: `deleted/${props.filePath}`,
    files: [],
  });
  const appDispatch = useAppDispatch();
  const { deletedFiles } = useSelector(selectFolders);

  function deleteMove(item: string) {
    if (item === "Delete") {
      setMovedObjForFetch(
        (movedObjForFetch.files = [...movedObjForFetch.files, props.filename])
      );
      appDispatch(fetchMove(movedObjForFetch)).then(() => {
        appDispatch(fetchGetAllFiles()).then(() =>
          appDispatch(fetchGetFolder())
        );
      });
    }
  }
  const location = useLocation();

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
                  appDispatch(fetchDeleteFile({ username, delFile })).then(() =>
                    appDispatch(fetchGetDeletedFiles())
                  );
                } else if (item.name === "Recover") {
                  const recover = [
                    {
                      filePath: props.filePath,
                      filename: props.filename ? props.filename : "",
                    },
                  ];
                  appDispatch(fetchRecover(recover)).then(() => appDispatch(fetchGetDeletedFiles()));
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
