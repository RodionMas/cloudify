import React from "react";
import style from "./Folder.module.css";
import folderImg from "../../../../../assets/img/OpenedFolder.png";
import more from "../../../../../assets/img/More.png";
import DotsBlok from "./DotsBlok/DotsBlok";
import { useClickOutside } from "../../../../../tools/UseClickOutside";
import { checkColor, FolderType } from "../../../../../store/FoldersSlice";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../../../../store/hooks";

const Folder: React.FC<FolderType> = ({ name, color, size, filesNumber }) => {
  const [hiddenDotsMenu, setHiddenDotsMenu] = React.useState(false);
  const dotsRef = React.useRef<HTMLDivElement | null>(null);
  const moreFileRef = React.useRef<HTMLDivElement | null>(null);
  const dispatch = useAppDispatch()
  useClickOutside([dotsRef, moreFileRef], () => {
    if (hiddenDotsMenu) {
      setHiddenDotsMenu(false);
      
    }})
  return (
    <div className={style.wrapper}>
      <div style={{background: color}} className={style.color}></div>
      <div className={style.folder}>
        <Link onClick={() => dispatch(checkColor(color))} to={`/home/userfolder/${name}`} className={style.folderBox}>
          <img src={folderImg} alt="folder" />
          <span className={style.nameFolder}>{name}</span>
        </Link>
        <div className={style.dotsBlock} ref={dotsRef}>
          <button
            onClick={() => setHiddenDotsMenu(!hiddenDotsMenu)}
            className={style.dotsBtn}
          >
            <img src={more} alt="show-more" />
          </button>
        </div>
        {hiddenDotsMenu && <DotsBlok ref={moreFileRef} />}
      </div>
      <div className={style.aboutFile}>
        <span className={style.files}>{filesNumber} Files</span>
        <span className={style.memory}>{size}</span>
      </div>
    </div>
  );
};

export default Folder;
