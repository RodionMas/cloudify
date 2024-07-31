import React from "react";
import style from "./FilesSmall.module.css";
import arrow from "../../../../assets/img/Chevron Down.png";
import fileImg from "../../../../assets/img/File.png";
import { Link } from "react-router-dom";
import showAll from "../../../../assets/img/all.png";
import more from "../../../../assets/img/More.png";
import MoreFileSmall from "./MoreFileSmall/MoreFileSmall";

const FilesSmall: React.FC = () => {
  const sortBy = ["Name", "File Size", "Last Changes"];
  const [sortArrow, setSortArrow] = React.useState(0);
  const [showMore, setShowMore] = React.useState(0)
  const [hideMore, setHideMore] = React.useState(false)
  const filesArr = [
    {
      name: "MyBook.docx",
      memory: "2.4Mb",
      changes: "27 September 2023",
    },
    {
      name: "Table.xls",
      memory: "7.9Mb",
      changes: "2 April 2024",
    },
    {
      name: "My Dog.jpg",
      memory: "0.43Mb",
      changes: "12 December 2023",
    },
    {
      name: "Script.cmd",
      memory: "2.4Mb",
      changes: "1 March 2024",
    },
  ];
  const toggleShow = (index: number) => {
    setShowMore(index)
    !hideMore && setHideMore(true)
  }
  const useOutsideClick = (refs: any, callback: any) => {
    React.useEffect(() => {
      const handleClickOutside = (event: { target: any; }) => {
        if (refs.every((ref: { current: { contains: (arg0: any) => any; }; }) => ref.current && !ref.current.contains(event.target))) {
          callback();
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [refs, callback]);
  };
  const refs = React.useRef<any>(filesArr.map(() => React.createRef()));
  useOutsideClick(refs.current, () => setHideMore(false));
  return (
    <div className={style.wrapper}>
      <div className={style.box}>
        <h1 className={style.title}>Files</h1>
        <Link className={style.linkAll} to={"/photos/all"}>
          Show All <img className={style.linkImg} src={showAll} alt="all" />
        </Link>
      </div>
      <div className={style.fileContainer}>
        <div className={style.sortBy}>
          {sortBy.map((sort, i) => (
            <button
              key={i}
              onClick={() => setSortArrow(i)}
              className={style.sortText}
            >
              {sort}{" "}
              {sortArrow === i && (
                <img
                  className={style.sortDown}
                  src={arrow}
                  alt="Chevron Down"
                />
              )}{" "}
            </button>
          ))}
        </div>
        {filesArr.map((item, i) => {
          return (
            <div  key={i} className={style.files}>
              <div className={style.fileRow}>
                <span>
                  {" "}
                  <img
                    className={style.fileImg}
                    src={fileImg}
                    alt="file"
                  />{" "}
                  {item.name}
                </span>
              </div>
              <div className={style.fileRow}>
                <span>{item.memory}</span>
              </div>
              <div  className={style.fileRow}>
                <span>{item.changes}</span>
                <button
                 ref={refs.current[i]}
                 onClick={() => toggleShow(i)} className={style.moreBtn}>
                  <img src={more} alt="show more" />
                </button>
              </div>
              {showMore === i && hideMore && <MoreFileSmall />}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FilesSmall;
