import React from 'react';
import style from './BtnShowMore.module.css'

import forward from '../../../../../../assets/img/dots/Forward.png'
import ChooseFolder from './ChooseFolder/ChooseFolder';
import { useAppDispatch, useAppSelector } from '../../../../../../store/hooks';
import { changeRenameModal, fetchRenameFile, renameFile } from '../../../../../../store/FoldersSlice';
import { selectFolders } from '../../../../../../selectors/selectors';

const BtnShowMore: React.FC<any> = React.memo(({ name, image, deleteMove, props }) => {
  const dispatch = useAppDispatch()
  function renameFn (name: string){
    const renameObjFn = {
      oldFileName: props.filename,
      filepath: props.filePath,
      // newFileName: ""
    }
    if (name === "Rename") {
      dispatch(changeRenameModal())
      dispatch(renameFile(renameObjFn))
      // renameObj
      // dispatch(fetchRenameFile())
    }
  }
  return (
        <>
        <button
              onClick={() => {
                deleteMove(name);
                props.hideContentFn();
                renameFn(name)
              }}
              className={style.moreBox}
            >
              <img src={image} alt="item" />
              <span className={style.name}>{name} {name === 'Move' && <img className={style.img} src={forward} alt='forward' />} </span>
              {name === 'Move' && <ChooseFolder filePath={props.filePath} filename={props.filename} />}
            </button>
           
        </>
    );
});

export default BtnShowMore;