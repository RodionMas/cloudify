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
  React.useEffect(() => {
    appDispatch(fetchGetFolder());
  }, []);
  return (
    <div className={style.wrapper}>
      <h1 className={style.title}>Folders</h1>
      <div className={style.grid}>
        <Swiper
          slidesPerView={4}
          spaceBetween={0}
          navigation={true}
          modules={[Navigation]}
          className="mySwiper"
        >
          {folders.length === 0 ? (
            <NoFolders />
          ) : (
            folders.map((folder, i) => {
              return (
                <SwiperSlide key={uuidv4()}>
                  <Folder key={i} {...folder} />
                </SwiperSlide>
              );
            })
          )}
        </Swiper>
      </div>
    </div>
  );
};

export default Folders;
