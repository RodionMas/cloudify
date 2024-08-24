import React from "react";
import style from "./ProgressBar.module.css";
import { useAppDispatch, useAppSelector } from "../../../../../store/hooks";
import { fetchGetAmountData } from "../../../../../store/foldersSlice";
import { selectFolders } from "../../../../../selectors/selectors";

const ProgressBar: React.FC = () => {
  const { userMemory, totalSize } = useAppSelector(selectFolders);
  const percent = (totalSize / userMemory) * 100;
  const { err } = useAppSelector(selectFolders);
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(fetchGetAmountData());
  }, [dispatch]);
  return (
    <div className={style.wrapper}>
      <div className={style.progressBar}>
        <div
          className={style.progressBarFill}
          style={{ width: `${err ? 0 : percent}%` }}
        ></div>
      </div>
      <div className={style.progressLabel}>
        {err ? `0 Mb of 500` : `${totalSize}Mb of ${userMemory}`}
      </div>
    </div>
  );
};

export default ProgressBar;
