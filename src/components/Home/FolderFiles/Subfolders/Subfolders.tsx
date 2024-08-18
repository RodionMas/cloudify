import React from "react";
import { useAppSelector } from "../../../../store/hooks";
import { selectSubfolders } from "../../../../selectors/selectors";
import OneFile from "../../OneFile/OneFile";
import OneFolder from "../../OneFolder/OneFolder";
import { v4 as uuidv4 } from "uuid";
const Subfolders: React.FC = () => {
  const { subfilesForPackage, subfoldersForPackage } =
    useAppSelector(selectSubfolders);
  return (
    <>
      {subfilesForPackage.map((item, i) => (
        <OneFile key={uuidv4()} {...item} />
      ))}
      {subfoldersForPackage.map((folder, i) => (
        <OneFolder key={uuidv4()} folder={folder} />
      ))}
    </>
  );
};

export default Subfolders;
