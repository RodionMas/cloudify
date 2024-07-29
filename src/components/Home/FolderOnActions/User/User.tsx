import React from 'react';
import style from './User.module.css'
import userImg from '../../../../assets/img/User.png'
import logout from '../../../../assets/img/Logout.png'
import line from '../../../../assets/img/horizontalLine.png'
import { Link } from 'react-router-dom';

const User: React.FC = () => {
    return (
        <div className={style.wrapper}>
            <div className={style.user}>
                <img className={style.userImg} src={userImg} alt="user" />
                <span>Jerome</span>
            </div>
            <div className={style.logoutBlock}>
                <img src={line} alt="line" />
                {/* isAuth тоже нужно будет переключить */}<Link to={`/logot`}> <img src={logout} className={style.logoutImg} alt="logout" /></Link>
               
            </div>
        </div>
    );
};

export default User;