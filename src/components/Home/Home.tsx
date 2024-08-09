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

const Home: React.FC = () => {
  const { dragAndDrop } = useAppSelector(selectFolders);
  const { logout } = useAppSelector(selectFolders);
  const { renameModal } = useAppSelector(selectFolders)
  const {createFolderModal} = useAppSelector(selectFolders);
  return (
    <div className={style.wrapper}>
      <FolderOnActions />
      <Outlet />
      <Logout />
      {renameModal && <Rename />}
      {dragAndDrop && !logout && <DragAndDrop />}
      {createFolderModal && !logout && <CreateFolder />}
    </div>
  );
};

export default Home;
