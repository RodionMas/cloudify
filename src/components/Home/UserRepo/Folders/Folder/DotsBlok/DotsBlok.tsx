import { forwardRef } from "react";
import ReactDOM from "react-dom";
import style from "./DotsBlok.module.css";
import Forward from "../../../../../../assets/img/dots/Forward.png";
import download from "../../../../../../assets/img/dots/Download.png";
import Label from "../../../../../../assets/img/dots/PriceTag.png";
import Rename from "../../../../../../assets/img/dots/EditFile.png";
import Delete from "../../../../../../assets/img/dots/TrashCan.png";
import Colors from "./Colors/Colors";
import { useAppDispatch } from "../../../../../../store/hooks";
import { changeRenameFolderModal, fetchDeleteFolder, fetchGetFolder, renameLastNameFolder } from "../../../../../../store/FoldersSlice";

interface DotsBlokProps {
  position: { top: number; left: number };
}

const DotsBlok = forwardRef<HTMLDivElement, DotsBlokProps & any>(({setHiddenDotsMenu, position, name }, ref) => {
  const dots = [
    {
      name: "Download",
      image: download,
    },
    {
      name: "Label",
      image: Label,
      color: ["#FFB800", "#0094FF", "#D23434", "#39AA26"],
    },
    {
      name: "Rename",
      image: Rename,
    },
    {
      name: "Delete",
      image: Delete,
    },
  ]
  const dispatch = useAppDispatch()
  const handleDeleteFolder = async () => {
    try {
      await dispatch(fetchDeleteFolder(name))
      await dispatch(fetchGetFolder());
    } catch (error) {
      
    }
  }
  // Рендерим в портал
  return ReactDOM.createPortal(
    <div
      ref={ref}
      className={style.wrapper}
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
        position: 'absolute',
        zIndex: 1000,
      }}
    >
      {dots.map((item, i) => (
        <button onClick={() => {
          if (item.name === "Rename") {
            dispatch(renameLastNameFolder(name))
            dispatch(changeRenameFolderModal())
          } else if(item.name === "Delete"){
            handleDeleteFolder()
          }
          
        }} key={i} className={style.btn}>
          <img className={style.img} src={item.image} alt="category" />
          <span className={style.name}>{item.name}</span>
          {item.color && (
            <>
              <img className={style.forward} src={Forward} alt="Forward" />
              <Colors name={name} colors={item.color} />
            </>
          )}
        </button>
      ))}
    </div>,
    document.getElementById('portal-root')! // Используем оператор "не-null"
  );
  });


export default DotsBlok;