import React from 'react';
import style from './ProgressBar.module.css'
import { useAppDispatch } from '../../../../../store/hooks';
import { fetchGetAmountData } from '../../../../../store/FoldersSlice';
import { useSelector } from 'react-redux';
import { selectAuth, selectFolders } from '../../../../../selectors/selectors';

const ProgressBar: React.FC = () => {
    // const max = 50;
    // const current = 4.78;
    const {userMemory, totalSize} = useSelector(selectFolders)
    const percent = (totalSize / userMemory) * 100;
    const { username } = useSelector(selectAuth)
    const dispatch = useAppDispatch()
    React.useEffect(() => {
        dispatch(fetchGetAmountData(username))
    }, [totalSize, userMemory])
    return (
        <div className={style.wrapper}>
            <div className={style.progressBar}>
                <div className={style.progressBarFill} style={{width: `${percent}%`}}></div>
            </div>
            <div className={style.progressLabel}>{`${totalSize}Mb of ${userMemory}`}</div>
        </div>
    );
};

export default ProgressBar;