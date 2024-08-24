import React from "react";
import style from "./DragAndDrop.module.css";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  changeDragDrop,
  fetchDrop,
  fetchGetAllFiles,
  fetchGetAmountData,
  
} from "../../../store/foldersSlice";
import { selectAuth, selectFolders } from "../../../selectors/selectors";
import filePng from '../../../assets/img/File.png'
import { useLocation } from "react-router-dom";
import { FetchsubfoldersPackage, setFoldersURL } from "../../../store/subfolderSlice";

const DragAndDrop: React.FC = React.memo(() => {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation()
  const { username } = useAppSelector(selectAuth);
  const [drag, setDrag] = React.useState(false);
  const [formData, setFormData] = React.useState<FormData & {folderPath?: string | undefined} | null>(null);
  const { totalSize } = useAppSelector(selectFolders);
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
    const refreshPath = () => {
      const path = pathname
        const parts = path.split("/"); // Разбиваем строку на массив по "/"
        const index = parts.indexOf("userfolder"); // Находим индекс "userfolder"
  
        if (index !== -1) {
          const result = parts.slice(index + 1).join("/"); // Забираем все элементы после "userfolder" и соединяем их обратно в строку
          const encodedPath = result.replace(/\//g, "%2F");
          return encodedPath;
        }
    } 
  try {
    if (pathname.includes('userfolder') && formData) {
      const parts = pathname.split('/');
      const index = parts.indexOf('userfolder');
      const result = parts.slice(index + 1).join("/"); // Забираем все элементы после "userfolder" и соединяем их обратно в строку
      // Добавляем поле folderPath в formData
      formData.append('folderPath', result);

      // Обновляем состояние formData
      setFormData(formData);
      await dispatch(fetchDrop(formData));
      dispatch(setFoldersURL(pathname))
      await dispatch(FetchsubfoldersPackage(refreshPath()))
      await dispatch(fetchGetAmountData());
    } else if (formData) {
      dispatch(setFoldersURL(pathname))
      await dispatch(fetchDrop(formData));
      await dispatch(fetchGetAllFiles());
      await dispatch(FetchsubfoldersPackage(refreshPath()))
      await dispatch(fetchGetAmountData());
    }
  } catch (error) {
    console.error("Error creating folder:", error);
  } finally {
    dispatch(changeDragDrop());
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
          onClick={() => dispatch(changeDragDrop())}
          className={style.cancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
});

export default DragAndDrop;
