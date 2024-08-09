import React from "react";
import style from "../BtnShowMore.module.css";
import { useAppDispatch } from "../../../../../../../store/hooks";
import { fetchGetAllFiles, fetchGetFolder, fetchGetMoverShowMore, fetchMove } from "../../../../../../../store/FoldersSlice";
import { useSelector } from "react-redux";
import { selectFolders } from "../../../../../../../selectors/selectors";
import packageImg from "../../../../../../../assets/img/contur.png";
interface FileNameType {
  filename: string;
  filePath: string;
}
const ChooseFolder: React.FC<FileNameType> = ({ filename, filePath }) => {
  const dispatch = useAppDispatch();
  const { foldersShowMore } = useSelector(selectFolders);
  const [movedObjForFetch, setMovedObjForFetch] = React.useState<any>({
    source: "",
    target: "",
    files: [],
  });
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
              onClick={() => {
                setMovedObjForFetch(
                  ((movedObjForFetch.source = filePath),
                  (movedObjForFetch.target = folder.name),
                  (movedObjForFetch.files = [
                    ...movedObjForFetch.files,
                    filename,
                  ]))
                );
                dispatch(fetchMove(movedObjForFetch)).then(() => {
                  dispatch(fetchGetAllFiles()).then(() => dispatch(fetchGetFolder()));
                });
              }}
              className={style.btnFolder}
              key={i}
            >
              <img
                style={{ background: folder.color }}
                className={style.packageImg}
                src={packageImg}
                alt="package"
              />
              <span>{folder.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChooseFolder;
