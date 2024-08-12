import React from "react";
import style from "../BtnShowMore.module.css";
import { useAppDispatch, useAppSelector } from "../../../../../../../store/hooks";
import {
  fetchGetAllFiles,
  fetchGetFolder,
  fetchGetMoverShowMore,
  fetchMove,
} from "../../../../../../../store/FoldersSlice";
import { selectFolders } from "../../../../../../../selectors/selectors";
import packageImg from "../../../../../../../assets/img/contur.png";
import black from "../../../../../../../assets/img/foldersColor/black.png";
import blue from "../../../../../../../assets/img/foldersColor/blue.png";
import brown from "../../../../../../../assets/img/foldersColor/brown.png";
import green from "../../../../../../../assets/img/foldersColor/green.png";
import red from "../../../../../../../assets/img/foldersColor/red.png";
import violet from "../../../../../../../assets/img/foldersColor/violet.png";
import yellow from "../../../../../../../assets/img/foldersColor/yellow.png";

interface FileNameType {
  filename: string;
  filePath: string;
}
const ChooseFolder: React.FC<FileNameType> = ({ filename, filePath }) => {
  const dispatch = useAppDispatch();
  const { foldersShowMore } = useAppSelector(selectFolders);
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
                  dispatch(fetchGetAllFiles()).then(() =>
                    dispatch(fetchGetFolder())
                  );
                });
              }}
              className={style.btnFolder}
              key={i}
            >
              {folder.color === "#ffb800" ? (
                <img className={style.packageImg} src={yellow} alt="package" />
              ) : (
                folder.color === "#D23434" ? 
                <img className={style.packageImg} src={red} alt="package" /> :
                folder.color === "#D23434" ? 
                <img className={style.packageImg} src={violet} alt="package" /> :
                folder.color === "#0094FF" ? 
                <img className={style.packageImg} src={blue} alt="package" /> :
                folder.color === "#39AA26" ? 
                <img className={style.packageImg} src={green} alt="package" /> :
                folder.color === "#A76E2B" ? 
                <img className={style.packageImg} src={brown} alt="package" /> :
                <img className={style.packageImg} src={black} alt="package" /> 
              )}
              <span>{folder.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChooseFolder;
