import React from "react";
import { selectFolders } from "../../../../selectors/selectors";
import { useAppSelector } from "../../../../store/hooks";
import OneFile from "../../OneFile/OneFile";
import OneFolder from "../../OneFolder/OneFolder";

const FolderFilesArr: React.FC = () => {
  const { filesForPackage, foldersForPagckage } = useAppSelector(selectFolders);
  const { searchAllFiles } = useAppSelector(selectFolders);
  const { inpValue } = useAppSelector(selectFolders);
  return (
    <>
    {searchAllFiles.length !== 0 && inpValue
          ? searchAllFiles.map((item, i) => (
            <OneFile
              key={`${item.filename}-${i}`}
              {...item}
            />
          ))
          : filesForPackage.map((item, i) => (
            <OneFile key={i} {...item} />
          ))}
      {}
      {foldersForPagckage.map((folder, i) => (
        <OneFolder key={i} folder={folder} />
      ))}
    </>
  );
};

export default FolderFilesArr;
