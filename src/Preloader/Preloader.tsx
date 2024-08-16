import React from 'react';
import style from './Preloader.module.css'
import loader from '../assets/img/1488.png'

const Preloader: React.FC = () => {
    return (
        <div className={style.wrapper}>
            <div className={style.blur}>
                
            </div>
            <img className={style.preloadImg} src={loader} alt="preloader" />
        </div>
    );
};

export default Preloader;