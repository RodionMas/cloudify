import React from "react";
import style from "./CreateFolder.module.css";
import { selectFolders } from "../../../selectors/selectors";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  changeFolderModal,
  createModalColor,
  createModalName,
  fetchCreateFolder,
  fetchGetFolder,
} from "../../../store/foldersSlice";

const CreateFolder: React.FC = () => {
  const [selectedColor, setSelectedColor] = React.useState(0);
  const [checkMessage, setCheckMessage] = React.useState(false);
  const { folders } = useAppSelector(selectFolders);
  const { createFolder } = useAppSelector(selectFolders);
  const dispatch = useAppDispatch();
  const colorArr = [
    "#FFB800", //yellow
    "#FF7B31",
    "#D23434", //red
    "#E241B5",
    "#962EE8", //violet
    "#0094FF", //blue
    "#1F4C6D", 
    "#56ABB0", 
    "#39AA26", //green
    "#A76E2B", //brown
  ];
  const handleCreateFolder = async () => {
    try {
      const checkFolders = folders.every(
        (folder) => folder.name !== createFolder.name
      );
      if (checkFolders) {
      await dispatch(fetchCreateFolder(createFolder));
      await dispatch(fetchGetFolder());
      dispatch(changeFolderModal());
      } else {
        setCheckMessage((prev) => (prev = true));
      }
    } catch (error) {
      console.error('Error creating folder:', error);
    }
  };
  return (
    <div className={style.wrapper}>
      <h1 className={style.title}>Create a folder</h1>
      <input
        onChange={(e) => {
          dispatch(createModalName(e.target.value));
        }}
        className={style.inp}
        type="text"
        placeholder="Enter a folder name and choose a color"
      />
      {checkMessage && (
        <span className={style.messageCheck}>
          A folder with the same name already exists
        </span>
      )}
      <div className={style.colorBlock}>
        {colorArr.map((color, i) => (
          <button
            onClick={() => {
              dispatch(createModalColor(color))
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
          onClick={() => dispatch(changeFolderModal())}
          className={style.cancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CreateFolder;
