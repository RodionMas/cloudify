import React from 'react';
import style from './Search.module.css'
import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { selectFolders } from '../../../../selectors/selectors';
import { changeInpSearch, fetchSearch } from '../../../../store/foldersSlice';
import { debounce } from "lodash"

const Search: React.FC = () => {
    const { pathname } = useLocation()
    const { inpValue } = useAppSelector(selectFolders)
    const dispatch = useAppDispatch()
    const searchPath = () => {
        const path = pathname.split('/')
        return path[2]
    }
    const conditionPath = searchPath()
    // const debouncedSearch = React.useRef(
    //     debounce(async (criteria) => {
    //       console.log(123)
    //     }, 300)
    //   ).current;
    React.useEffect(() => { }, [pathname])
    return (
        <div className={style.wrapper}>
            {conditionPath === 'deleted' ? <input
                value={inpValue}
                onChange={(e) => dispatch(fetchSearch('meta_342'))}
                className={style.inp} type="text" placeholder='Search your files' /> : <input
                // value={} 
                className={style.inp} type="text" placeholder='Search your files' />}
        </div>
    );
};

export default React.memo(Search);