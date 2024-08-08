import React from 'react';
import style from './ChooseFolder.module.css'
import { useAppDispatch } from '../../../store/hooks';
import { fetchGetMoverShowMore } from '../../../store/FoldersSlice';
import { useSelector } from 'react-redux';
import { selectFolders } from '../../../selectors/selectors';

const ChooseFolder: React.FC =  React.memo(() => {
    const dispatch = useAppDispatch()
    const { foldersShowMore } = useSelector(selectFolders)
    React.useEffect(() => {
        dispatch(fetchGetMoverShowMore())
    }, [])
    return (
        <div className={style.wrapper}>
            {foldersShowMore.map((folder, i) => {
                return <>
                <span>{folder.name}</span>
                </>
            })}
        </div>
    );
});

export default ChooseFolder;