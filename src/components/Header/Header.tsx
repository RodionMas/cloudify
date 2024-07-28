import React from 'react';
import style from './Header.module.css'
import cloud from '../../assets/img/CloudsBlack.png'
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
    return (
        <>
        <Link className={style.wrapper} to={'/'}>
            <img className={style.logo} src={cloud} alt="cloud" />
            <span className={style.logoText}>Cloudify</span>
        </Link>
        </>
    );
};

export default Header;