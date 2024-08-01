import React from 'react';
import style from './Logout.module.css'
import { useSelector } from 'react-redux';
import { selectFolders } from '../../../selectors/selectors';
import { useAppDispatch } from '../../../store/hooks';
import { fetchLogout } from '../../../store/authSlice';
import { changeLogout } from '../../../store/FoldersSlice';

const Logout: React.FC = () => {
    const { logout } = useSelector(selectFolders)
    const appDispatch = useAppDispatch()
    const logoutFn = () => {
        appDispatch(changeLogout())
        appDispatch(fetchLogout())
        
    }
    return (
        <>
        {logout && <div className={style.wrapper}>
            <h2 className={style.title}>Are you sure you want to log out of this account?</h2>
            <div className={style.btnBlock}>
                <button onClick={() => logoutFn()} className={style.logout}>Log out</button>
                <button onClick={() => appDispatch(changeLogout())} className={style.cancel}>Cancel</button>
            </div>
        </div>}
        </>
    );
};

export default Logout;