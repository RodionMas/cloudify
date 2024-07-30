import React from 'react';
import style from './UserRepo.module.css'
import Search from './Search/Search';
import Folders from './Folders/Folders';
import FilesSmall from './FilesSmall/FilesSmall';

const UserRepo: React.FC = () => {
    return (
        <div className={style.wrapper}>
            <Search />
            <Folders />
            <FilesSmall />
        </div>
    );
};

export default UserRepo;