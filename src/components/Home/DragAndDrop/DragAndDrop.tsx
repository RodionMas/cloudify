import React from "react";
import style from "./DragAndDrop.module.css";
import { useAppDispatch } from "../../../store/hooks";
import { fetchDrop, fetchGetAmountData } from "../../../store/FoldersSlice";
import { useSelector } from "react-redux";
import { selectAuth } from "../../../selectors/selectors";

const DragAndDrop: React.FC = () => {
  const appDispatch = useAppDispatch();
  const { username } = useSelector(selectAuth);
  const [drag, setDrag] = React.useState(false);
  const [formData, setFormData] = React.useState<FormData | null>(null);

  function dragStartHandler(e: React.DragEvent<HTMLDivElement>): void {
    e.preventDefault();
    setDrag(true);
  }

  function dragLeaveHandler(e: React.DragEvent<HTMLDivElement>): void {
    e.preventDefault();
    setDrag(false);
  }

  function onDropHandler(e: any): void {
    e.preventDefault();
    let files: File[] = [...e.dataTransfer.files];
    const newFormData = new FormData();
    newFormData.append("file", files[0]);
    newFormData.append("user", username);
    setFormData(newFormData); // Сохраняем FormData в состоянии
    setDrag(false);
  }

  function handleSelectClick(): void {
    if (formData) {
      appDispatch(fetchDrop(formData));
      appDispatch(fetchGetAmountData(username))
    } else {
      console.error("No file selected.");
    }
  }

  return (
    <div className={style.wrapper}>
      {drag ? (
        <div
          onDragStart={(e) => dragStartHandler(e)}
          onDragLeave={(e) => dragLeaveHandler(e)}
          onDragOver={(e) => dragStartHandler(e)}
          onDrop={(e) => onDropHandler(e)}
          className={style.drop}
        >
          <span className={style.text}>Release the file to download</span>
        </div>
      ) : (
        <div
          onDragStart={(e) => dragStartHandler(e)}
          onDragLeave={(e) => dragLeaveHandler(e)}
          onDragOver={(e) => dragStartHandler(e)}
          className={style.drag}
        >
          <span className={style.text}>
            Drag and drop a file here, paste, or select from your computer.
          </span>
        </div>
      )}
      <div className={style.btnBox}>
        <button onClick={handleSelectClick} className={style.select}>Select</button>
        <button className={style.cancel}>Cancel</button>
      </div>
    </div>
  );
};

export default DragAndDrop;