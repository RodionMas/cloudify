import React from "react";
import { useAppSelector } from "../../../../store/hooks";
import { selectSubfolders } from "../../../../selectors/selectors";
import OneFolder from "../../OneFolder/OneFolder";
import { v4 as uuidv4 } from "uuid";
import OneFileSubfolder from "../../FileSubfolder/OneFileSubfolder";
const Subfolders: React.FC = () => {
  const { subfilesForPackage, subfoldersForPackage } =
    useAppSelector(selectSubfolders);
  return (
    <>
      {subfilesForPackage.map((file) => (
        <OneFileSubfolder
        key={uuidv4()}
        filename={file.filename} 
        size={file.size} 
        lastModified={file.lastModified}
        filePath={file.filePath} 
        color={file.color}
      />
      ))}
      {subfoldersForPackage.map((folder) => (
        <OneFolder key={uuidv4()} folder={folder} />
      ))}
    </>
  );
};

export default Subfolders;
