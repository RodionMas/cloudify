import React from 'react';
import style from './Search.module.css'

const Search: React.FC = () => {
    return (
        <div className={style.wrapper}>
            <input className={style.inp} type="text" placeholder='Search your files' />
        </div>
    );
};

export default Search;