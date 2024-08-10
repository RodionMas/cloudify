import React from "react";
import style from "./CreateFolder.module.css";
import { useSelector } from "react-redux";
import { selectFolders } from "../../../selectors/selectors";
import { useAppDispatch } from "../../../store/hooks";
import {
  changeFolderModal,
  createModalColor,
  createModalName,
  fetchCreateFolder,
  fetchGetFolder,
} from "../../../store/FoldersSlice";

const CreateFolder: React.FC = () => {
  const [selectedColor, setSelectedColor] = React.useState(0);
  const { createFolder } = useSelector(selectFolders);
  const appDispatch = useAppDispatch();
  const colorArr = [
    "#FFB800",
    "#FF7B31",
    "#D23434",
    "#E241B5",
    "#962EE8",
    "#0094FF",
    "#1F4C6D",
    "#56ABB0",
    "#39AA26",
    "#A76E2B",
  ];
  const handleCreateFolder = async () => {
    try {
      await appDispatch(fetchCreateFolder(createFolder));
      await appDispatch(fetchGetFolder());
    } catch (error) {
      console.error('Error creating folder:', error);
    } finally {
      appDispatch(changeFolderModal());
    }
  };
  return (
    <div className={style.wrapper}>
      <h1 className={style.title}>Create a folder</h1>
      <input
        onChange={(e) => {
          appDispatch(createModalName(e.target.value));
        }}
        className={style.inp}
        type="text"
        placeholder="Enter a folder name and choose a color"
      />
      <div className={style.colorBlock}>
        {colorArr.map((color, i) => (
          <button
            onClick={() => {
              appDispatch(createModalColor(color))
              setSelectedColor(i)
            }}
            key={i}
            style={{ background: color, boxShadow: selectedColor === i ? `0px 2px 16px 0px ${color}` : `` }}
            className={style.color}
          ></button>
        ))}
      </div>
      <div className={style.btnBox}>
        <button
          onClick={() => handleCreateFolder()}
          className={style.create}
        >
          Create
        </button>
        <button
          onClick={() => appDispatch(changeFolderModal())}
          className={style.cancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CreateFolder;
