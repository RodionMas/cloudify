import React from "react";
import style from "./Home.module.css";
import FolderOnActions from "./FolderOnActions/FolderOnActions";
import { Outlet } from "react-router-dom";
import { selectFolders } from "../../selectors/selectors";
import Logout from "./LogoutModal/LogoutModal";
import DragAndDrop from "./DragAndDrop/DragAndDrop";
import CreateFolder from "./CreateFolder/CreateFolder";
import { useAppSelector } from "../../store/hooks";
import Rename from "./Rename/Rename";
import CreateSubfolder from "./CreateSubfolder/CreateSubfolder";
import RenameFolder from "./RenameFolder/RenameFolder";

const Home: React.FC = () => {
  const { dragAndDrop } = useAppSelector(selectFolders);
  const { logout } = useAppSelector(selectFolders);
  const { renameModal } = useAppSelector(selectFolders);
  const { createFolderModal } = useAppSelector(selectFolders);
  const { createSubfolderModal } = useAppSelector(selectFolders);
  const { renameFolderModal } = useAppSelector(selectFolders);
  return (
    <div className={style.wrapper}>
      <FolderOnActions />
      <Outlet />
      <Logout />
      {renameFolderModal && !logout && <RenameFolder />}
      {createSubfolderModal && !logout && <CreateSubfolder />}
      {renameModal && <Rename />}
      {dragAndDrop && !logout && <DragAndDrop />}
      {createFolderModal && !logout && <CreateFolder />}
    </div>
  );
};

export default Home;
