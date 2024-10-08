import React from "react";
import style from "../BtnShowMore.module.css";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../../../store/hooks";
import {
  fetchGetAllFiles,
  fetchGetFolder,
  fetchGetMoverShowMore,
  fetchMove,
} from "../../../../../../../store/foldersSlice";
import { selectFolders } from "../../../../../../../selectors/selectors";
import black from "../../../../../../../assets/img/foldersColor/black.png";
import blue from "../../../../../../../assets/img/foldersColor/blue.png";
import brown from "../../../../../../../assets/img/foldersColor/brown.png";
import green from "../../../../../../../assets/img/foldersColor/green.png";
import red from "../../../../../../../assets/img/foldersColor/red.png";
import violet from "../../../../../../../assets/img/foldersColor/violet.png";
import yellow from "../../../../../../../assets/img/foldersColor/yellow.png";
import darkblue from "../../../../../../../assets/img/foldersColor/darkblue.png";
import orange from "../../../../../../../assets/img/foldersColor/orange.png";
import verdigris from "../../../../../../../assets/img/foldersColor/verdigris.png";
import pink from "../../../../../../../assets/img/foldersColor/pink.png";

interface FileNameType {
  filename: string;
  filePath: string;
}

interface MoveFileType {
  files: string[];
  source: string;
  target: string;
}
const ChooseFolder: React.FC<FileNameType> = ({ filename, filePath }) => {
  const dispatch = useAppDispatch();
  const { foldersShowMore } = useAppSelector(selectFolders);
  const handleMove = async (moveFile: MoveFileType) => {
    try {
      await dispatch(fetchMove(moveFile));
      await dispatch(fetchGetAllFiles());
      await dispatch(fetchGetFolder());
    } catch (error) {}
  };
  React.useEffect(() => {
    // if (!foldersShowMore.length) {
    dispatch(fetchGetMoverShowMore());
    // }
  }, [dispatch]);

  return (
    <div className={style.wrapperFolder}>
      <div className={style.wrapperOverflow}>
        <h5 className={style.miniTitle}>Choose a folder</h5>
        {foldersShowMore.map((folder, i) => {
          return (
            <div
              onClick={() => {
                let moveFile: MoveFileType = {
                  source: filePath,
                  target: folder.name,
                  files: [],
                };
                moveFile = {
                  ...moveFile,
                  files: [...moveFile.files, filename],
                };
                handleMove(moveFile);
              }}
              className={style.btnFolder}
              key={i}
            >
              {folder.color === "#ffb800" ? (
                <img className={style.packageImg} src={yellow} alt="package" />
              ) : folder.color === "#D23434" ? (
                <img className={style.packageImg} src={red} alt="package" />
              ) : folder.color === "#962EE8" ? (
                <img className={style.packageImg} src={violet} alt="package" />
              ) : folder.color === "#0094FF" ? (
                <img className={style.packageImg} src={blue} alt="package" />
              ) : folder.color === "#39AA26" ? (
                <img className={style.packageImg} src={green} alt="package" />
              ) : folder.color === "#A76E2B" ? (
                <img className={style.packageImg} src={brown} alt="package" />
              ) : folder.color === "#1F4C6D" ? (
                <img
                  className={style.packageImg}
                  src={darkblue}
                  alt="package"
                />
              ) : folder.color === "#FF7B31" ? (
                <img className={style.packageImg} src={orange} alt="package" />
              ) : folder.color === "#56ABB0" ? (
                <img
                  className={style.packageImg}
                  src={verdigris}
                  alt="package"
                />
              ) : folder.color === "#E241B5" ? (
                <img className={style.packageImg} src={pink} alt="package" />
              ) : (
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
