import React from 'react';
import style from './OneFolder.module.css'
import { useLocation } from 'react-router-dom';
import { useClickOutside } from '../../../tools/UseClickOutside';
import folderPng from '../../../assets/img/OpenedFolder.png'
import more from "../../../assets/img/More.png";
import MoreFileSmall from '../UserRepo/FilesSmall/MoreFileSmall/MoreFileSmall';

const OneFolder: React.FC<any> = ({folder}) => {
  const { lastModified, size, name } = folder
    const { pathname } = useLocation()
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
            <img className={style.fileImg} src={folderPng} alt="folder" />{" "}
            {name}
          </span>
        </div>
       {pathname !== '/home/deleted' && <div className={style.fileRow}>
          <div>
           <span>Folder</span>
          </div>
        </div>}
        <div className={pathname !== '/home/deleted' ? style.fileRow : style.fileRowDeleted}>
          <span className={style.size}>{size}</span>
        </div>
        <div className={pathname !== '/home/deleted' ? style.fileRow : style.fileRowDeleted}>
          {/* last mod */}
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
              filename={folder}
              hideContentFn={hideContentFn}
              ref={moreFileRef}
            //   customFolderName={customFolderName}
            //   filePath={filePath}
              style={{
                position: "absolute",
                top: menuPosition.top - 50,
                left: menuPosition.left + 50,
              }}
            />
          ) : (
            <MoreFileSmall
              filename={folder}
            //   customFolderName={customFolderName}
              hideContentFn={hideContentFn}
              ref={moreFileRef}
            //   filePath={filePath}
              style={{
                position: "absolute",
                top: menuPosition.top - 300,
                left: menuPosition.left + 50,
              }}
            />
          ))}
      </div>
    );
};

export default OneFolder;