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
import { useAppDispatch } from "../../../../../store/hooks";
import { fetchGetAllFiles, fetchMoveToDeleted } from "../../../../../store/FoldersSlice";
import { useSelector } from "react-redux";
import { selectAuth } from "../../../../../selectors/selectors";

const MoreFileSmall = forwardRef<HTMLDivElement, any>((props, ref) => {
  const showMoreArr = [
    { name: "Download", image: download },
    { name: "Create Link", image: link },
    { name: "Favourite", image: bookmark },
    { name: "Move", image: move },
    { name: "Info", image: info },
    { name: "Rename", image: edit },
    { name: "Delete", image: cash },
  ];

  const { username } = useSelector(selectAuth);
  const [deletedObjForFetch, setDeletedObjForFetch] =
    useState<any>({
      username: username,
      forFetch: {
        source: "",
        target: "deleted",
        files: [],
      },
    });
  const appDispatch = useAppDispatch();

  function deleteMove(item: string) {
    if (item === "Delete") {
      setDeletedObjForFetch(
        (deletedObjForFetch.forFetch.files = [
          ...deletedObjForFetch.forFetch.files,
          props.filename,
        ])
      );
      appDispatch(fetchMoveToDeleted(deletedObjForFetch)).then(() => {
        appDispatch(fetchGetAllFiles(username))
      }).catch(e => console.warn(e));
      
    }
  }

  const menu = (
    <div ref={ref} className={style.wrapper} style={props.style}>
      {showMoreArr.map((item, i) => (
        <button
          onClick={() => {
            deleteMove(item.name);
            props.hideContentFn();
          }}
          key={i}
          className={style.moreBox}
        >
          <img src={item.image} alt="item" />
          <span className={style.name}>{item.name}</span>
        </button>
      ))}
    </div>
  );

  return ReactDOM.createPortal(menu, document.body);
});

export default MoreFileSmall;
