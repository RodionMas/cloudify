import React from "react";
import style from "../OneFile.module.css";
import { useAppDispatch } from "../../../../store/hooks";
import {
  changeDeleteSelected,
  deleteSelected,
} from "../../../../store/deleteSlise";

interface FileType {
  filename: string;
  filePath: string;
}

// Интерфейс для пропсов компонента Checkbox

const CheckboxDeleted: React.FC<FileType> = ({ filename, filePath }) => {
  const [isChecked, setIsChecked] = React.useState(false);
  const dispatch = useAppDispatch();
  return (
    <input
      checked={isChecked}
      onChange={() => {
        setIsChecked((prev) => !prev);
        if (!isChecked) {
          //условие наоброт, тут checked = true
          dispatch(deleteSelected({ filename, filePath }));
        } else if (isChecked) {
          dispatch(changeDeleteSelected(filename));
        }
      }}
      className={style.checkbox}
      type="checkbox"
    />
  );
};

export default CheckboxDeleted;
