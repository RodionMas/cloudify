import React from 'react';
import style from './Home.module.css'
import FolderOnActions from './FolderOnActions/FolderOnActions';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation()
    React.useEffect(() => {
        if (location.pathname === '/') {
            navigate("/home")
        }
    }, []);
    return (
        <div className={style.wrapper}>
            <FolderOnActions />
            <Outlet />
        </div>
    );
};

export default Home;