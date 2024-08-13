import { forwardRef } from "react";
import ReactDOM from "react-dom";
import style from "./DotsBlok.module.css";
import { useSelector } from "react-redux";
import { selectFolders } from "../../../../../../selectors/selectors";
import Forward from "../../../../../../assets/img/dots/Forward.png";
import Colors from "./Colors/Colors";

interface DotsBlokProps {
  position: { top: number; left: number };
}

const DotsBlok = forwardRef<HTMLDivElement, DotsBlokProps>(({ position }, ref) => {
  const { dots } = useSelector(selectFolders);

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
        <button onClick={(e) => console.log(e)} key={i} className={style.btn}>
          <img className={style.img} src={item.image} alt="category" />
          <span className={style.name}>{item.name}</span>
          {item.color && (
            <>
              <img className={style.forward} src={Forward} alt="Forward" />
              <Colors colors={item.color} />
            </>
          )}
        </button>
      ))}
    </div>,
    document.getElementById('portal-root')! // Используем оператор "не-null"
  );
  });


export default DotsBlok;