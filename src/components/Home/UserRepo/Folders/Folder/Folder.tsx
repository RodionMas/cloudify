import React from "react";
import style from "./Folder.module.css";
import folderImg from "../../../../../assets/img/OpenedFolder.png";
import more from "../../../../../assets/img/More.png";
import DotsBlok from "./DotsBlok/DotsBlok";
import { useClickOutside } from "../../../../../tools/UseClickOutside";

const Folder: React.FC = () => {
  const [hiddenDotsMenu, setHiddenDotsMenu] = React.useState(false);
  const dotsRef = React.useRef<HTMLDivElement | null>(null);
  const moreFileRef = React.useRef<HTMLDivElement | null>(null);
  useClickOutside([dotsRef, moreFileRef], () => {
    if (hiddenDotsMenu) {
      setHiddenDotsMenu(false);
    }})
  return (
    <div className={style.wrapper}>
      <div className={style.color}></div>
      <div className={style.folder}>
        <div className={style.folderBox}>
          <img src={folderImg} alt="folder" />
          <span className={style.nameFolder}>Photos</span>
        </div>
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
        <span className={style.files}>1786 Files</span>
        <span className={style.memory}>2.78 Gb</span>
      </div>
    </div>
  );
};

export default Folder;
