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
import filePng from '../../../assets/img/File.png'

const DragAndDrop: React.FC = () => {
  const appDispatch = useAppDispatch();
  const { username } = useSelector(selectAuth);
  const [drag, setDrag] = React.useState(false);
  const [formData, setFormData] = React.useState<FormData | null>(null);
  const { totalSize } = useSelector(selectFolders);
  const [onVisibleFiles, setOnVisibleFiles] = React.useState<string[]>([]);
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
    });
    files.map((file) => setOnVisibleFiles((prev) => [...prev, file.name]));
    newFormData.append("user", username);
    setFormData(newFormData); // Сохраняем FormData в состоянии
    setDrag(false);
  }
  async function handleSelectClick() {
    try {
      if (formData) {
        await appDispatch(fetchDrop(formData));
        await appDispatch(fetchGetAllFiles());
        await appDispatch(fetchGetAmountData());
      }
    } catch (error) {
      console.error("Error creating folder:", error);
    } finally {
      appDispatch(changeDragDrop());
    }
  }
  React.useEffect(() => {}, [totalSize, onVisibleFiles]);
  return (
    <div className={style.wrapper}>
      {onVisibleFiles.length !== 0 ? (
        <div className={style.dropFiles}>
          {onVisibleFiles.map((file) => {
            return <div key={file} className={style.filesBox}>
              <img src={filePng} alt="file" />
              <span className={style.textFiles}>{file}</span>
            </div>;
          })}
        </div>
      ) : drag ? (
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
