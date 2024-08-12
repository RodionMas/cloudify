import React from "react";
import style from "../OneFile.module.css";
import { useAppDispatch } from "../../../../store/hooks";
import { addFile, setSourceAndTarget } from "../../../../store/FoldersSlice";

interface FetchFileType {
  filename: string;
  filePath: string;
}

const Checkbox: React.FC<any> = React.memo(
  ({ filename, filePath, filesArr, setFilesArr }) => {
    const dispatch = useAppDispatch();
    const [isChecked, setIsChecked] = React.useState(false);
    const [movedObjDel, setMovedObjDel] = React.useState<{
      source: string;
      target: string;
      files: string[];
    }>({
      source: filePath,
      target: `deleted/${filePath}`,
      files: [],
    });
    const handleCheckboxChange = () => {
      const newCheckedState = !isChecked;
      setIsChecked(newCheckedState);
      if (newCheckedState) {
      }
    };
    React.useEffect(() => {
      console.log(filesArr)
      console.log(filePath)
    }, [filesArr])
    return (
      <input
        checked={isChecked}
        onChange={() => {
            handleCheckboxChange()
            setFilesArr((prev: any) => [
              ...prev, 
              {
                filename: filename,  // просто присваиваем значение filename
                filePath: filePath   // просто присваиваем значение filePath
              }
            ]);
            dispatch(addFile(filesArr))
        }}
        className={style.checkbox}
        type="checkbox"
      />
    );
  }
);

export default Checkbox;
