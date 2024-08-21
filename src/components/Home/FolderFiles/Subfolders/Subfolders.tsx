import React from "react";
import { useAppSelector } from "../../../../store/hooks";
import { selectSubfolders } from "../../../../selectors/selectors";
import OneFolder from "../../OneFolder/OneFolder";
import { v4 as uuidv4 } from "uuid";
import OneFile from "../../OneFile/OneFile";
const Subfolders: React.FC = () => {
  const { subfilesForPackage, subfoldersForPackage } =
    useAppSelector(selectSubfolders);
  return (
    <>
      {subfilesForPackage.map((file) => (
        <OneFile key={uuidv4()} {...file}
      />
      ))}
      {subfoldersForPackage.map((folder) => (
        <OneFolder key={uuidv4()} folder={folder} />
      ))}
    </>
  );
};

export default Subfolders;
