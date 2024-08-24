import { forwardRef } from "react";
import ReactDOM from "react-dom";
import style from "./DotsBlok.module.css";
import Forward from "../../../../../../assets/img/dots/Forward.png";
import Label from "../../../../../../assets/img/dots/PriceTag.png";
import Rename from "../../../../../../assets/img/dots/EditFile.png";
import Delete from "../../../../../../assets/img/dots/TrashCan.png";
import Colors from "./Colors/Colors";
import { useAppDispatch } from "../../../../../../store/hooks";
import {
  changeRenameFolderModal,
  fetchDeleteFolder,
  fetchGetAllFiles,
  fetchGetDeletedFiles,
  fetchGetFolder,
  renameLastNameFolder,
} from "../../../../../../store/foldersSlice";

interface DotsBlokProps {
  position: { top: number; left: number };
}

const DotsBlok = forwardRef<HTMLDivElement, DotsBlokProps & any>(
  ({ position, name }, ref) => {
    const dots = [
      {
        name: "Label",
        image: Label,
        color: [
          "#FFB800", //yellow
          "#FF7B31",
          "#D23434", //red
          "#E241B5",
          "#962EE8", //violet
          "#0094FF", //blue
          "#1F4C6D",
          "#56ABB0",
          "#39AA26", //green
          "#A76E2B", //brown],
        ],
      },
      {
        name: "Rename",
        image: Rename,
      },
      {
        name: "Delete",
        image: Delete,
      },
    ];
    const dispatch = useAppDispatch();
    const handleDeleteFolder = async () => {
      try {
        await dispatch(fetchDeleteFolder(name));
        await dispatch(fetchGetFolder());
        await dispatch(fetchGetDeletedFiles());
        await dispatch(fetchGetAllFiles());
      } catch (error) {}
    };
    // Рендерим в портал
    return ReactDOM.createPortal(
      <div
        ref={ref}
        className={style.wrapper}
        style={{
          top: `${position.top}px`,
          left: `${position.left}px`,
          position: "absolute",
          zIndex: 1000,
        }}
      >
        {dots.map((item, i) => (
          <button
            onClick={() => {
              if (item.name === "Rename") {
                dispatch(renameLastNameFolder(name));
                dispatch(changeRenameFolderModal());
              } else if (item.name === "Delete") {
                handleDeleteFolder();
              }
            }}
            key={i}
            className={style.btn}
          >
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
      document.getElementById("portal-root")! // Используем оператор "не-null"
    );
  }
);

export default DotsBlok;
