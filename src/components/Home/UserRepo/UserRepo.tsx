import React from "react";
import style from "./UserRepo.module.css";
import Search from "./Search/Search";
import Folders from "./Folders/Folders";
import FilesSmall from "./FilesSmall/FilesSmall";
import { useAppSelector } from "../../../store/hooks";
import { selectFolders } from "../../../selectors/selectors";

const UserRepo: React.FC = () => {
  const { err } = useAppSelector(selectFolders);
  return (
    <section className={style.wrapper}>
      {err ? (
        <div>
          <h1>{String(err)}...</h1>
        </div>
      ) : (
        <>
          <Search />
          <Folders />
          <FilesSmall />
        </>
      )}
    </section>
  );
};

export default UserRepo;
