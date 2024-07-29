import React from 'react';
import style from './Storage.module.css'
import ProgressBar from './ProgressBar/ProgressBar';

const Storage: React.FC = () => {
    return (
        <div className={style.wrapper}>
            <h3 className={style.title}>Storage</h3>
            <ProgressBar />
        </div>  
    );
};

export default Storage;