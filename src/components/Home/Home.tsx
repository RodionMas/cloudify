import React from 'react';
import style from './Home.module.css'
import FolderOnActions from './FolderOnActions/FolderOnActions';
import { Outlet } from 'react-router-dom';

const Home: React.FC = () => {
    return (
        <div className={style.wrapper}>
            <FolderOnActions />
            <Outlet />
        </div>
    );
};

export default Home;