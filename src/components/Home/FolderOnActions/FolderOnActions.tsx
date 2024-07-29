import React from 'react';
import style from './FolderOnActions.module.css'
import Header from '../../Header/Header';
import FileManagementButtons from './FileManagementButtons/FileManagementButtons';
import FileActions from './FileActions/FileActions';
import User from './User/User';
import Storage from './Storage/Storage';

const FolderOnActions: React.FC = () => {
    return (
        <div className={style.wrapper}>
            <Header />
            <FileManagementButtons />
            <FileActions />
            <User />
            <Storage />
        </div>
    );
};

export default FolderOnActions;