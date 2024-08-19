import React from "react";
import style from "./FileActions.module.css";
import { Link, useLocation } from "react-router-dom";
import Deleted from "../../../../assets/img/deleted.png";
import All from "../../../../assets/img/allFiles.png";
import home from "../../../../assets/img/Home Page.png";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { selectFolders } from "../../../../selectors/selectors";
import { fetchGetDeletedFiles } from "../../../../store/foldersSlice";

const FileActions: React.FC = () => {
  const { pathname } = useLocation()
  const [activeLink, setActiveLink] = React.useState(0)
  const dispatch = useAppDispatch()
  const { deletedFiles } = useAppSelector(selectFolders);
  const categoryArr = [
    {
      name: "Home",
      image: home,
    },
    {
      name: "All Files",
      image: All,
    },
    {
      name: "Deleted",
      image: Deleted,
    },
  ];
  React.useEffect(() => {
    if (pathname === undefined) {
      setActiveLink(0)
    } else if (pathname === '/home/files') {
      setActiveLink(1)
    } else if(pathname === '/home/deleted'){
      setActiveLink(2)
    }
    dispatch(fetchGetDeletedFiles())
  }, [pathname, deletedFiles.length])
  return (
    <div className={style.wrapper}>
      {categoryArr.map((category, i) => {
        return (
          <Link
            key={i}
            className={activeLink === i ? style.activeLink : style.linkCategory}
            onClick={() => setActiveLink(i)}
            to={`/home/${category.name === "All Files"
                ? "files"
                : category.name.toLowerCase()
              }`}
          >
            {" "}
            <img className={style.img} src={category.image} alt="" />{" "}
            {category.name} {category.name === 'Deleted' && `(${deletedFiles.length})`}
          </Link>
        );
      })}
    </div>
  );
};

export default FileActions;
