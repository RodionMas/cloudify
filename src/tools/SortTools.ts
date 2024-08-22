import { sortDel, sortFiles, sortSubfiles } from "../store/foldersSlice";
import { useAppDispatch } from "../store/hooks";
import { Dispatch, SetStateAction } from "react";
import { sortSubfileInFolder } from "../store/subfolderSlice";

// Типизация для параметров
type SortToolsFilesParams = {
  i: number;
  setSortArrow: Dispatch<SetStateAction<number>>;
  setRotateArrow: Dispatch<SetStateAction<boolean>>;
  sortArrow: number;
  rotateArrow: boolean;
  dispatch: ReturnType<typeof useAppDispatch>;
};

// Функция для сортировки
export const sortToolsFiles = ({
  i,
  setSortArrow,
  setRotateArrow,
  sortArrow,
  rotateArrow,
  dispatch,
}: SortToolsFilesParams) => {
//Если текущая сортировка уже активна, меняем только rotate
  const newRotate = i === sortArrow ? !rotateArrow : false;

  setSortArrow(i);
  setRotateArrow(newRotate);

  const sortParams = {
    ind: i,
    rotate: !newRotate,
  };

  dispatch(sortFiles(sortParams));
};
// Функция для сортировки в DeletedPage компоненте
export const sortToolsDelFiles = ({
    i,
    setSortArrow,
    setRotateArrow,
    sortArrow,
    rotateArrow,
    dispatch,
  }: SortToolsFilesParams) => {
   // Если текущая сортировка уже активна, меняем только rotate
   const newRotate = i === sortArrow ? !rotateArrow : false;
   // Сначала меняем состояния
   setSortArrow(i);
   setRotateArrow(newRotate);
   // Потом вызываем сортировку
   const sortParams = {
     ind: i,
     rotate: !newRotate,
   };
   //В deleted отсутствует соритровка по файлам
   if (sortParams.ind >= 1) {
    const newParams = {
      ind: i + 1,
      rotate: newRotate,
    }
    return dispatch(sortDel(newParams));
   }
   dispatch(sortDel(sortParams));
  };

  export const sortToolsSubfiles = ({
    i,
    setSortArrow,
    setRotateArrow,
    sortArrow,
    rotateArrow,
    dispatch,
  }: SortToolsFilesParams) => {
  //Если текущая сортировка уже активна, меняем только rotate
    const newRotate = i === sortArrow ? !rotateArrow : false;
  
    setSortArrow(i);
    setRotateArrow(newRotate);
  
    const sortParams = {
      ind: i,
      rotate: !newRotate,
    };
  
    dispatch(sortSubfileInFolder(sortParams));
    dispatch(sortSubfiles(sortParams))
  };