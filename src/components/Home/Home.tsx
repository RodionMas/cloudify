import React from "react";
import style from "./Home.module.css";
import FolderOnActions from "./FolderOnActions/FolderOnActions";
import { Outlet } from "react-router-dom";
import { selectAuth, selectFolders, selectSubfolders } from "../../selectors/selectors";
import Logout from "./LogoutModal/LogoutModal";
import DragAndDrop from "./DragAndDrop/DragAndDrop";
import CreateFolder from "./CreateFolder/CreateFolder";
import { useAppSelector } from "../../store/hooks";
import Rename from "./Rename/Rename";
import CreateSubfolder from "./CreateSubfolder/CreateSubfolder";
import RenameFolder from "./RenameFolder/RenameFolder";
import RenameSubfolder from "./RenameSubfolder/RenameSubfolder";

const Home: React.FC = () => {
  const { dragAndDrop } = useAppSelector(selectFolders);
  const { logout } = useAppSelector(selectAuth);
  const { renameModal } = useAppSelector(selectFolders);
  const { createFolderModal } = useAppSelector(selectFolders);
  const { createSubfolderModal } = useAppSelector(selectFolders);
  const { renameFolderModal } = useAppSelector(selectFolders);
  const { subfolderModal } = useAppSelector(selectSubfolders);
  return (
    <div className={style.wrapper}>
      <FolderOnActions />
      <Outlet />
      <Logout />
      {subfolderModal && !logout && <RenameSubfolder />}
      {renameFolderModal && !logout && <RenameFolder />}
      {createSubfolderModal && !logout && <CreateSubfolder />}
      {renameModal && <Rename />}
      {dragAndDrop && !logout && <DragAndDrop />}
      {createFolderModal && !logout && <CreateFolder />}
    </div>
  );
};

export default React.memo(Home);
