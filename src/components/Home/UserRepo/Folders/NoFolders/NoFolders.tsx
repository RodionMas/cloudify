import React from 'react';
import style from './NoFolders.module.css'
import add from '../../../../../assets/img/Add.png'
import { useAppDispatch } from '../../../../../store/hooks';
import { changeFolderModal } from '../../../../../store/FoldersSlice';

const NoFolders: React.FC = () => {
    const dispatch = useAppDispatch()
    return (
        <div className={style.wrapper}>
            <button onClick={() => dispatch(changeFolderModal())} className={style.btn}><img src={add} alt="add" /></button>
        </div>
    );
};

export default NoFolders;