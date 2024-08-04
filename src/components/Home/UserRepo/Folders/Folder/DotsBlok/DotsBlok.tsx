import { forwardRef } from "react";
import style from "./DotsBlok.module.css";
import { useSelector } from "react-redux";
import { selectFolders } from "../../../../../../selectors/selectors";
import Forward from "../../../../../../assets/img/dots/Forward.png";
import Colors from "./Colors/Colors";

interface DotsBlokProps {}
const DotsBlok = forwardRef<HTMLDivElement, DotsBlokProps>((props, ref) => {
  const { dots } = useSelector(selectFolders);
  return (
    <div
    ref={ref}
      className={style.wrapper}>
      {dots.map((item, i) => {
        return (
          <button onClick={e => console.log(e)} key={i} className={style.btn}>
            {" "}
            <img className={style.img} src={item.image} alt="category" />{" "}
            <span className={style.name}>{item.name}</span>
            {item.color && (
              <>
                <img className={style.forward} src={Forward} alt="Forward" />
                <Colors colors={item.color} />
              </>
            )}
          </button>
        );
      })}
    </div>
  );
});

export default DotsBlok;
