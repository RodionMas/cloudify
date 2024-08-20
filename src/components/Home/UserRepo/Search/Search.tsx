import React from "react";
import style from "./Search.module.css";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { selectFolders } from "../../../../selectors/selectors";
import {
  changeInpSearch,
  fetchGetDeletedFiles,
  fetchSearchDel,
  fetchSearchFiles,
} from "../../../../store/foldersSlice";
import debounce from "lodash.debounce";

const Search: React.FC = () => {
  const { pathname } = useLocation();
  const { inpValue } = useAppSelector(selectFolders);
  const dispatch = useAppDispatch();
  const searchPath = () => {
    const path = pathname.split("/");
    return path[2];
  };
  const conditionPath = searchPath();
  // Дебаунсируемая версия функции, которая будет вызываться через 350 мс после последнего изменения
  const debouncedSearch = React.useMemo(
    () =>
      debounce((value: string) => {
        if (conditionPath === "deleted") {
          dispatch(fetchSearchDel(value))
            .then(() => dispatch(fetchGetDeletedFiles()))
            .catch((e) => console.warn(e));
        } else {
          dispatch(fetchSearchFiles(value))
            .then(() => dispatch(fetchGetDeletedFiles()))
            .catch((e) => console.warn(e));
        }
      }, 450),
    [dispatch]
  );
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeInpSearch(e.target.value));
    debouncedSearch(e.target.value);
  };
  React.useEffect(() => {}, [pathname]);
  return (
    <div className={style.wrapper}>
      <input
        value={inpValue}
        onChange={(e) => {
          handleSearch(e);
        }}
        className={style.inp}
        type="text"
        placeholder="Search your files"
      />
    </div>
  );
};

export default React.memo(Search);
