import React from 'react';
import style from './ProgressBar.module.css'

const ProgressBar: React.FC = () => {
    const max = 50;
    const current = 4.78;
    const percent = (current / max) * 100;
    console.log(percent)
    return (
        <div className={style.wrapper}>
            <div className={style.progressBar}>
                <div className={style.progressBarFill} style={{width: `${percent}%`}}></div>
            </div>
            <div className={style.progressLabel}>{`${current}Gb of ${max}`}</div>
        </div>
    );
};

export default ProgressBar;