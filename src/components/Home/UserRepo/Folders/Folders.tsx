import React from "react";
import style from "./Folders.module.css";
import Folder from "./Folder/Folder";
import { useAppDispatch } from "../../../../store/hooks";
import { fetchGetFolder } from "../../../../store/FoldersSlice";
import { useSelector } from "react-redux";
import { selectFolders } from "../../../../selectors/selectors";
import NoFolders from "./NoFolders/NoFolders";

const Folders: React.FC = () => {
  const appDispatch = useAppDispatch()
  const { folders } = useSelector(selectFolders)
  React.useEffect(() => {
    appDispatch(fetchGetFolder())
  }, [])
  return (
    <div className={style.wrapper}>
      <h1 className={style.title}>Folders</h1>
      <div className={style.grid}>
        {folders.length === 0 ? <NoFolders /> : folders.map((folder, i) => {
          return <Folder key={i} {...folder} />
        })}
      </div>
    </div>
  );
};

export default Folders;
