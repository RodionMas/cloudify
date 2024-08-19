import React from "react";
import style from "./OneFolder.module.css";
import { Link, useLocation } from "react-router-dom";
import { useClickOutside } from "../../../tools/UseClickOutside";
import folderPng from "../../../assets/img/OpenedFolder.png";
import more from "../../../assets/img/More.png";
import MoreSubfolderSmall from "./MoreSubfolderSmall/MoreSubfolderSmall";


const OneFolder: React.FC<any> = ({ folder }) => {
  const { lastModified, size, name } = folder;
  const { pathname } = useLocation();
  const hideRef = React.useRef<HTMLButtonElement | null>(null);
  const moreFileRef = React.useRef<HTMLDivElement | null>(null);
  const [hideContent, setHideContent] = React.useState(false);
  const [menuPosition, setMenuPosition] = React.useState({ top: 0, left: 0 });
  const hideContentFn = () => {
    setHideContent(prevHideContent => !prevHideContent);
  };

  useClickOutside([hideRef, moreFileRef], () => {
    if (hideContent) {
      setHideContent(false);
    }
  });
  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setMenuPosition({
      top: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX,
    });
    hideContentFn();
  };

  return (
    <div className={style.files}>
      <Link 
        to={`${pathname}/${folder.name}`} className={style.filesLink}>
        <div className={style.fileRow}>
          <span className={style.fileName}>
            <img className={style.fileImg} src={folderPng} alt="folder" />{" "}
            {name}
          </span>
        </div>
        {pathname !== "/home/deleted" && (
          <div className={style.fileRow}>
            <span>Folder</span>
          </div>
        )}
        <div
          className={
            pathname !== "/home/deleted" ? style.fileRow : style.fileRowDeleted
          }
        >
          <span className={style.size}>{size}</span>
        </div>
        <div
          className={
            pathname !== "/home/deleted" ? style.fileRow : style.fileRowDeleted
          }
        >
          <span>{lastModified.day}</span>
        </div>
      </Link>
      <button
        ref={hideRef}
        onClick={handleButtonClick}
        className={style.moreBtn}
      >
        <img className={style.moreBtnImg} src={more} alt="show more" />
      </button>
      {hideContent &&
          <MoreSubfolderSmall
            filename={folder}
            name={name}
            //   customFolderName={customFolderName}
            hideContentFn={hideContentFn}
            ref={moreFileRef}
            //   filePath={filePath}
            style={{
              position: "absolute",
              top: menuPosition.top - 90,
              left: menuPosition.left + 50,
            }}
          />
        }
    </div>
  );
};

export default OneFolder;
