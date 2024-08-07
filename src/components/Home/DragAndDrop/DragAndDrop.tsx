import React from "react";
import style from "./DragAndDrop.module.css";
import { useAppDispatch } from "../../../store/hooks";
import {
  changeDragDrop,
  fetchDrop,
  fetchGetAllFiles,
  fetchGetAmountData,
} from "../../../store/FoldersSlice";
import { useSelector } from "react-redux";
import { selectAuth, selectFolders } from "../../../selectors/selectors";

const DragAndDrop: React.FC = () => {
  const appDispatch = useAppDispatch();
  const { username } = useSelector(selectAuth);
  const [drag, setDrag] = React.useState(false);
  const [formData, setFormData] = React.useState<FormData | null>(null);
  const { totalSize } = useSelector(selectFolders);
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
    files.forEach((files) => {
      newFormData.append(`files`, files);
    })

    newFormData.append("user", username);
    setFormData(newFormData); // Сохраняем FormData в состоянии
    setDrag(false);
  }
  // .then(() =>  appDispatch(fetchGetAllFiles(username)))
  function handleSelectClick(): void {
    if (formData) {
      appDispatch(fetchDrop(formData)).then(() => appDispatch(fetchGetAllFiles(username))).then(() => appDispatch(fetchGetAmountData()));

      appDispatch(changeDragDrop());
    } else {
      console.error("No file selected.");
    }
  }
  React.useEffect(() => { }, [totalSize]);
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
        <button onClick={handleSelectClick} className={style.select}>
          Select
        </button>
        <button
          onClick={() => appDispatch(changeDragDrop())}
          className={style.cancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DragAndDrop;
