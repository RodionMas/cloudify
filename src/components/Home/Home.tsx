import React from 'react';
import style from './Home.module.css'
import FolderOnActions from './FolderOnActions/FolderOnActions';
import UserRepo from './UserRepo/UserRepo';

const Home: React.FC = () => {
    return (
        <div className={style.wrapper}>
            <FolderOnActions />
            <UserRepo />
        </div>
    );
};

export default Home;