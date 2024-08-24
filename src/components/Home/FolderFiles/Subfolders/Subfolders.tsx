import React from "react";
import { useAppSelector } from "../../../../store/hooks";
import {
  selectFolders,
  selectSubfolders,
} from "../../../../selectors/selectors";
import OneFolder from "../../OneFolder/OneFolder";
import OneFile from "../../OneFile/OneFile";
const Subfolders: React.FC = () => {
  const { subfilesForPackage, subfoldersForPackage } =
    useAppSelector(selectSubfolders);
  const { searchAllFiles } = useAppSelector(selectFolders);
  const { inpValue } = useAppSelector(selectFolders);
  return (
    <>
      {searchAllFiles.length !== 0 && inpValue
        ? searchAllFiles.map((item, i) => (
            <OneFile key={`${item.filename}-${i}`} {...item} />
          ))
        : subfilesForPackage.map((item, i) => <OneFile key={i} {...item} />)}
      {}
      {subfoldersForPackage.map((folder, i) => (
        <OneFolder key={i} folder={folder} />
      ))}
    </>
  );
};

export default Subfolders;
