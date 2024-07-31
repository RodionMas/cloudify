import React from 'react';
import style from './Home.module.css'
import FolderOnActions from './FolderOnActions/FolderOnActions';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAuth } from '../../selectors/selectors';

const Home: React.FC = () => {
    const { isAuth } = useSelector(selectAuth);
    const navigate = useNavigate();
    React.useEffect(() => {
      if (isAuth) {
        navigate("/home");
      } else {
        navigate("/");
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