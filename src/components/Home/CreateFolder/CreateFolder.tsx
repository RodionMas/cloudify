import React from "react";
import style from "./CreateFolder.module.css";
import { useSelector } from "react-redux";
import { selectAuth } from "../../../selectors/selectors";
import { useAppDispatch } from "../../../store/hooks";
import { fetchCreateFolder } from "../../../store/FoldersSlice";

const CreateFolder: React.FC = () => {
    const { username } = useSelector(selectAuth)
    const [createFolder, setCreateFolder] = React.useState<any>({name: '', color: '', username: username})
    const [nameFolder, setNameFolder] = React.useState<string>('')
    const appDispatch = useAppDispatch()
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
  return (
    <div className={style.wrapper}>
      <h1 className={style.title}>Create a folder</h1>
      <input
      onChange={(e) => {
        // setNameFolder()
        
            setCreateFolder(createFolder.name = e.target.value)
            console.log(createFolder)
      }}
        className={style.inp}
        type="text"
        placeholder="Enter a folder name and choose a color"
      />
      <div className={style.colorBlock}>
        {colorArr.map((color, i) => (
          <button
          onClick={() => setCreateFolder(createFolder.color = color)}
            key={i}
            style={{ background: color }}
            className={style.color}
          ></button>
        ))}
      </div>
      <div className={style.btnBox}>
        <button onClick={() => appDispatch(fetchCreateFolder(createFolder))} className={style.create}>Create</button>
        <button className={style.cancel}>Cancel</button>
      </div>
    </div>
  );
};

export default CreateFolder;
