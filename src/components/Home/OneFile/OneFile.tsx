import React from "react";
import style from "./OneFile.module.css";
import MoreFileSmall from "../UserRepo/FilesSmall/MoreFileSmall/MoreFileSmall";
import more from "../../../assets/img/More.png";
import fileImg from "../../../assets/img/File.png";
import folderImg from "../../../assets/img/Folder.png";
import { useClickOutside } from "../../../tools/UseClickOutside";
import { useLocation } from "react-router-dom";

const OneFile: React.FC<any> = React.memo(
  ({ filename, size, lastModified, customFolderName, filePath, color }) => {
    const hideRef = React.useRef<HTMLButtonElement | null>(null);
    const moreFileRef = React.useRef<HTMLDivElement | null>(null);
    const [hideContent, setHideContent] = React.useState(false);
    const [menuPosition, setMenuPosition] = React.useState({ top: 0, left: 0 });
    const location = useLocation();
    const hideContentFn = () => {
      setHideContent(!hideContent);
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
        <div className={style.fileRow}>
          <span className={style.fileName}>
            <img className={style.fileImg} src={fileImg} alt="file" />{" "}
            {filename}
          </span>
        </div>
        <div className={style.fileRow}>
          <div style={{background: !customFolderName ? `#D9D9D9` : color}} className={style.folderName}>
            <img src={folderImg} alt="folder-name" />
            <span className={style.folderNameText}>{customFolderName ? customFolderName : 'All Files'}</span>
          </div>
        </div>
        <div className={style.fileRow}>
          <span className={style.size}>{size}</span>
        </div>
        <div className={style.fileRow}>
          <span>{lastModified.day}</span>
          <button
            ref={hideRef}
            onClick={handleButtonClick}
            className={style.moreBtn}
          >
            <img src={more} alt="show more" />
          </button>
        </div>
        {hideContent &&
          (location.pathname === "/home/deleted" ? (
            <MoreFileSmall
              filename={filename}
              hideContentFn={hideContentFn}
              ref={moreFileRef}
              customFolderName={customFolderName}
              filePath={filePath}
              style={{
                position: "absolute",
                top: menuPosition.top - 50,
                left: menuPosition.left + 50,
              }}
            />
          ) : (
            <MoreFileSmall
              filename={filename}
              customFolderName={customFolderName}
              hideContentFn={hideContentFn}
              ref={moreFileRef}
              filePath={filePath}
              style={{
                position: "absolute",
                top: menuPosition.top - 300,
                left: menuPosition.left + 50,
              }}
            />
          ))}
      </div>
    );
  }
);

export default OneFile;
