import React, { useCallback } from "react";
import style from "./Folders.module.css";
import Folder from "./Folder/Folder";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { fetchColorFolder, fetchGetAllFiles, fetchGetFolder } from "../../../../store/foldersSlice";
import { selectFolders } from "../../../../selectors/selectors";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { v4 as uuidv4 } from "uuid";
import NoFolders from "./NoFolders/NoFolders";

const Folders: React.FC = () => {
  const dispatch = useAppDispatch();
  const { folders } = useAppSelector(selectFolders);
  const { colorFolder } = useAppSelector(selectFolders);

  const handleColorFolder = useCallback(async () => {
    try {
      await dispatch(fetchColorFolder(colorFolder));
      await dispatch(fetchGetFolder());
      await dispatch(fetchGetAllFiles());
    } catch (error) {
      console.warn(error);
    }
  }, [dispatch, colorFolder]);

  React.useEffect(() => {
    if (folders.length === 0) {
      dispatch(fetchGetFolder());
    }
    if (colorFolder.newColor) {
      handleColorFolder();
    }
  }, [colorFolder.newColor, folders.length, dispatch, handleColorFolder]);

  return (
    <div className={style.wrapper}>
      <h1 className={style.title}>Folders</h1>
      <div className={style.grid}>
        {folders.length === 0 ? (
          <NoFolders />
        ) : (
          <Swiper
            slidesPerView={3}
            spaceBetween={30}
            navigation={{
              nextEl: `.${style.swiperButtonNext}`,
              prevEl: `.${style.swiperButtonPrev}`,
            }}
            modules={[Navigation]}
            className="mySwiper"
          >
            {folders.map((folder) => (
              <SwiperSlide key={uuidv4()}>
                <Folder {...folder} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
        {folders.length > 3 && 
        <>
        <div className={style.swiperButtonPrev}></div>
        <div className={style.swiperButtonNext}></div>
        </>
        }
      </div>
    </div>
  );
};

export default Folders;