import React from "react";
import style from "../OneFile.module.css";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { selectMove } from "../../../../selectors/selectors";
import { addFile, removeFile } from "../../../../store/moveSlice";

// Интерфейс для пропсов компонента Checkbox
interface CheckboxProps {
  filename: string;
  filePath: string;
}

const Checkbox: React.FC<CheckboxProps> = 
  ({ filename, filePath }) => {
    const dispatch = useAppDispatch();
    const [isChecked, setIsChecked] = React.useState(false);    
    const handleCheckboxChange = () => {
      const newCheckedState = !isChecked;
      setIsChecked(newCheckedState);
      if (!isChecked) {
        dispatch(addFile({
          filename: filename, 
          filePath: filePath,
          newFilePath: ''   
        }))
      }
      else if(isChecked) {
        dispatch(removeFile(filename))
      }
    };
    const { loading } = useAppSelector(selectMove)
    React.useEffect(() => {
      if (loading === 'pending') {
        setIsChecked(false)
      }
    }, [loading])
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
