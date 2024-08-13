import React from "react";
import style from "./Folders.module.css";
import Folder from "./Folder/Folder";
import { useAppDispatch } from "../../../../store/hooks";
import { fetchGetFolder } from "../../../../store/FoldersSlice";
import { useSelector } from "react-redux";
import { selectFolders } from "../../../../selectors/selectors";
import NoFolders from "./NoFolders/NoFolders";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { v4 as uuidv4 } from 'uuid';

const Folders: React.FC = () => {
  const appDispatch = useAppDispatch();
  const { folders } = useSelector(selectFolders);
  const myRef = React.useRef(null)
  React.useEffect(() => {
    appDispatch(fetchGetFolder());
  }, [appDispatch]);

  return (
    <div className={style.wrapper}>
      <h1 className={style.title}>Folders</h1>
      <div className={style.grid}>
        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          navigation={{
            nextEl: `.${style.swiperButtonNext}`,
            prevEl: `.${style.swiperButtonPrev}`
          }}
          modules={[Navigation]}
          className="mySwiper"
        >
          {folders.length === 0 ? (
            <NoFolders />
          ) : (
            folders.map((folder) => (
              <SwiperSlide key={uuidv4()}>
                <Folder {...folder} />
              </SwiperSlide>
            ))
          )}
        </Swiper>
        <div className={style.swiperButtonPrev}></div>
        <div className={style.swiperButtonNext}></div>
      </div>
    </div>
  );
};

export default Folders;