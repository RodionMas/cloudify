import React from "react";
import style from "../OneFile.module.css";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { addFile } from "../../../../store/FoldersSlice";
import { selectFolders } from "../../../../selectors/selectors";

// Интерфейс для одного файла
interface FileType {
  filename: string;
  filePath: string;
}

// Интерфейс для пропсов компонента Checkbox
interface CheckboxProps {
  filename: string;
  filePath: string;
  filesArr: FileType[];
  setFilesArr: React.Dispatch<React.SetStateAction<FileType[]>>;
}

const Checkbox: React.FC<CheckboxProps> = 
  ({ filename, filePath, filesArr, setFilesArr }) => {
    const dispatch = useAppDispatch();
    const [isChecked, setIsChecked] = React.useState(false);
    const { movedObjForFetch } = useAppSelector(selectFolders)
    const handleCheckboxChange = () => {
      const newCheckedState = !isChecked;
      setIsChecked(newCheckedState);
      if (!isChecked) {
        setFilesArr((prev: any) => [
          ...prev, 
          {
            filename: filename, 
            filePath: filePath,
            newFilePath: ''   
          }
        ]);
        dispatch(addFile(filesArr))
      }
      else if(isChecked) {
        setFilesArr(prev => (prev.filter(file => file.filename !== filename)))
        dispatch(addFile(filesArr))
      }
    };
    React.useEffect(() => {
      if (filesArr.length !== movedObjForFetch.length) {
        dispatch(addFile(filesArr))
      }
    }, [filesArr, movedObjForFetch, dispatch])
    return (
      <input
        checked={isChecked}
        onChange={() => {
          handleCheckboxChange()
        }}
        className={style.checkbox}
        type="checkbox"
      />
    );
  }

export default Checkbox;
