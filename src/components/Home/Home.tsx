import React from "react";
import style from "./Home.module.css";
import FolderOnActions from "./FolderOnActions/FolderOnActions";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectFolders } from "../../selectors/selectors";
import Logout from "./LogoutModal/LogoutModal";
import DragAndDrop from "./DragAndDrop/DragAndDrop";

const Home: React.FC = () => {
  const { dragAndDrop } = useSelector(selectFolders);
  const { logout } = useSelector(selectFolders);
  return (
    <div className={style.wrapper}>
      <FolderOnActions />
      <Outlet />
      <Logout />
      {dragAndDrop && !logout && <DragAndDrop />}
    </div>
  );
};

export default Home;
