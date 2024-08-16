import React from "react";
import { useAppSelector } from "../../../../store/hooks";
import { selectFolders } from "../../../../selectors/selectors";
import OneFile from "../../OneFile/OneFile";
import OneFolder from "../../OneFolder/OneFolder";

const Subfolders: React.FC = () => {
  const { subfilesForPackage, subfoldersForPackage } =
    useAppSelector(selectFolders);
  return (
    <>
      {subfilesForPackage.map((item, i) => (
        <OneFile key={i} {...item} />
      ))}
      {subfoldersForPackage.map((folder, i) => (
        <OneFolder key={i} folder={folder} />
      ))}
    </>
  );
};

export default Subfolders;
