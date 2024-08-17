import style from "./MoreSubfolderSmall.module.css";
import { forwardRef, useState } from "react";
import ReactDOM from "react-dom";
import edit from "../../../../assets/img/showMoreSmall/Edit File.png";
import cash from "../../../../assets/img/showMoreSmall/Trash Can.png";
import BtnSubfolderMore from "./BtnSubfolderMore/BtnSubfolderMore";

const MoreSubfolderSmall = forwardRef<HTMLDivElement, any>(
  (props, ref,) => {
    const showMoreArr = [
      { name: "Rename", image: edit },
      { name: "Delete", image: cash },
    ];
    
    const [moveFiles, setMoveFiles] = useState<any>({
      source: props.filePath,
      target: `deleted/${props.filePath}`,
      files: [],
    });
    async function deleteMove(item: string) {
      if (item === "Delete") {
        setMoveFiles((moveFiles.files = [...moveFiles.files, props.filename]));
        try {
        } catch (error) {
          console.warn(error);
        }
      }
    }
    const menu = (
      <div ref={ref} className={style.wrapper} style={props.style}>
        {showMoreArr.map((item) => (
          <BtnSubfolderMore
            props={props}
            deleteMove={deleteMove}
            key={item.name} // Используем имя как ключ
            {...item}
          />
        ))}
      </div>
    );

    return ReactDOM.createPortal(menu, document.body);
  }
);
export default MoreSubfolderSmall;