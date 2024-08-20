import React from "react";
import style from "./FileSubfolder.module.css";
import more from "../../../assets/img/More.png";
import fileImg from "../../../assets/img/File.png";
import folderImg from "../../../assets/img/Folder.png";
import { useClickOutside } from "../../../tools/UseClickOutside";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { checkColor } from "../../../store/foldersSlice";
import { selectFolders } from "../../../selectors/selectors";
import MoreFileSubfolder from "./MoreFileSubfolder/MoreFileSubfolder";

// Описание типа пропсов для компонента
interface OneFileSubfolderProps {
  filename: string;
  size: string;
  lastModified: {
    day: string;
  };
  customFolderName?: string;
  filePath: string;
  color: string;
  // Другие возможные пропсы...
}

const OneFileSubfolder: React.FC<OneFileSubfolderProps> = React.memo(
  ({
    filename,
    size,
    lastModified,
    customFolderName,
    filePath,
    color,
    // setFilesArr,
    // filesArr,
  }) => {
    const hideRef = React.useRef<HTMLButtonElement | null>(null);
    const moreFileRef = React.useRef<HTMLDivElement | null>(null);
    const [hideContent, setHideContent] = React.useState(false);
    const dispatch = useAppDispatch();
    const [menuPosition, setMenuPosition] = React.useState({
      top: 0,
      left: 0,
    });
    const { colorForFolder } = useAppSelector(selectFolders);

    const hideContentFn = React.useCallback(() => {
      setHideContent((prevHideContent) => !prevHideContent);
    }, []);

    useClickOutside([hideRef, moreFileRef], () => {
      if (hideContent) {
        setHideContent(false);
      }
    });

    const { pathname } = useLocation();

    const handleButtonClick = React.useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        const rect = event.currentTarget.getBoundingClientRect();
        setMenuPosition({
          top: rect.bottom + window.scrollY,
          left: rect.left + window.scrollX,
        });
        hideContentFn();
      },
      [hideContentFn]
    );

    React.useEffect(() => {
      if (!colorForFolder) {
        dispatch(checkColor(color));
      }
    }, [dispatch, color, colorForFolder]);

    return (
      <div className={style.files}>
        <div className={style.fileRow}>
          <span className={style.fileName}>
            <img className={style.fileImg} src={fileImg} alt="file" />{" "}
            {filename}
          </span>
        </div>
        {pathname !== "/home/deleted" && (
          <div className={style.fileRow}>
            {pathname.includes("userfolder") ? (
              <span>File111</span>
            ) : (
              <div
                style={{ background: !customFolderName ? `#D9D9D9` : color }}
                className={style.folderName}
              >
                <img src={folderImg} alt="folder-name" />
                <span className={style.folderNameText}>
                  {customFolderName ? customFolderName : "All Files"}
                </span>
              </div>
            )}
          </div>
        )}
        <div className={style.fileRowDeleted}>
          <span className={style.size}>{size}</span>
        </div>
        <div className={style.fileRowDeleted}>
          <span>{lastModified.day}</span>
          <button
            ref={hideRef}
            onClick={handleButtonClick}
            className={style.moreBtn}
          >
            <img src={more} alt="show more" />
          </button>
        </div>
        {hideContent && (
          <MoreFileSubfolder
            filename={filename}
            customFolderName={customFolderName}
            hideContentFn={hideContentFn}
            ref={moreFileRef}
            filePath={filePath}
            style={{
              position: "absolute",
              top: menuPosition.top - 190,
              left: menuPosition.left + 50,
            }}
          />
        )}
      </div>
    );
  }
);

export default OneFileSubfolder;