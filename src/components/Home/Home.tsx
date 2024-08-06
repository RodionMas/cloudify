import React from "react";
import style from "./Home.module.css";
import FolderOnActions from "./FolderOnActions/FolderOnActions";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectFolders } from "../../selectors/selectors";
import Logout from "./LogoutModal/LogoutModal";
import DragAndDrop from "./DragAndDrop/DragAndDrop";
import CreateFolder from "./CreateFolder/CreateFolder";

const Home: React.FC = () => {
  const { dragAndDrop } = useSelector(selectFolders);
  const { logout } = useSelector(selectFolders);
  const {createFolderModal} = useSelector(selectFolders);
  return (
    <div className={style.wrapper}>
      <FolderOnActions />
      <Outlet />
      <Logout />
      {dragAndDrop && !logout && <DragAndDrop />}
      {createFolderModal && !logout && <CreateFolder />}
    </div>
  );
};

export default Home;
