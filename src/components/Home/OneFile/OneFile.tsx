import React from "react";
import style from "./OneFile.module.css";
import MoreFileSmall from "../UserRepo/FilesSmall/MoreFileSmall/MoreFileSmall";
import more from "../../../assets/img/More.png";
import fileImg from "../../../assets/img/File.png";
import folderImg from "../../../assets/img/Folder.png";
import { useClickOutside } from "../../../tools/UseClickOutside";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { checkColor } from "../../../store/foldersSlice";
import { selectFolders } from "../../../selectors/selectors";
import Checkbox from "./Checkbox/Checkbox";
import CheckboxDeleted from "./CheckboxDeleted/CheckboxDeleted";

const OneFile: React.FC<any> = React.memo(
  ({
    filename,
    size,
    lastModified,
    customFolderName,
    filePath,
    color,
  }) => {
    const hideRef = React.useRef<HTMLButtonElement | null>(null);
    const moreFileRef = React.useRef<HTMLDivElement | null>(null);
    const [hideContent, setHideContent] = React.useState(false);
    const dispatch = useAppDispatch();
    const [menuPosition, setMenuPosition] = React.useState({ top: 0, left: 0 });
    const { colorForFolder } = useAppSelector(selectFolders);
    // Мемоизируем функцию hideContentFn
    const hideContentFn = React.useCallback(() => {
      setHideContent((prevHideContent) => !prevHideContent);
    }, []);

    useClickOutside([hideRef, moreFileRef], () => {
      if (hideContent) {
        setHideContent(false);
      }
    });

    const { pathname } = useLocation();

    // Мемоизируем функцию handleButtonClick с правильными зависимостями
    const handleButtonClick = React.useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation(); // Предотвращаем всплытие события
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
          {pathname === "/home/files" ? (
            <Checkbox
              filename={filename}
              filePath={filePath}
            />
          ) : (
            pathname === "/home/deleted" && <CheckboxDeleted 
            filename={filename}
            filePath={filePath} />
          )}
          <span className={style.fileName}>
            <img className={style.fileImg} src={fileImg} alt="file" />{" "}
            {filename}
          </span>
        </div>
        {pathname !== "/home/deleted" && (
          <div className={style.fileRow}>
            {pathname.includes("userfolder") ? (
              <span>File</span>
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
          <button
            ref={hideRef}
            onClick={handleButtonClick}
            className={style.moreBtn}
          >
            <img src={more} alt="show more" />
          </button>
        </div>
        {hideContent &&
          (pathname === "/home/deleted" ? (
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
            // MoreSubfolderSmall Сделать новый для сабфолдерс
            <MoreFileSmall
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
          ))}
      </div>
    );
  }
);

export default OneFile;
