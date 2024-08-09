import React from "react";
import style from "../BtnShowMore.module.css";
import { useAppDispatch } from "../../../../../../../store/hooks";
import { fetchGetMoverShowMore } from "../../../../../../../store/FoldersSlice";
import { useSelector } from "react-redux";
import { selectFolders } from "../../../../../../../selectors/selectors";

const ChooseFolder: React.FC = React.memo(() => {
  const dispatch = useAppDispatch();
  const { foldersShowMore } = useSelector(selectFolders);
  React.useEffect(() => {
    dispatch(fetchGetMoverShowMore());
  }, []);
  return (
    <div className={style.wrapperFolder}>
      <div className={style.wrapperOverflow}>
        <h5 className={style.miniTitle}>Choose a folder</h5>
        {foldersShowMore.map((folder, i) => {
          return (
            <div
              onClick={() => console.log(folder)}
              className={style.btnFolder}
              key={i}
            >
              <span>{folder.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
});

export default ChooseFolder;
