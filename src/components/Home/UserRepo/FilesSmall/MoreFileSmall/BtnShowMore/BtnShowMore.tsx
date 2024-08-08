import React from 'react';
import style from './BtnShowMore.module.css'
import ChooseFolder from '../../../../ChooseFolder/ChooseFolder';

const BtnShowMore: React.FC<any> = React.memo(({ name, image, deleteMove, props }) => {
    return (
        <>
        <button
              onClick={() => {
                deleteMove(name);
                props.hideContentFn();
              }}
              className={style.moreBox}
            >
              <img src={image} alt="item" />
              <span className={style.name}>{name}</span>
            </button>
            <ChooseFolder />
        </>
    );
});

export default BtnShowMore;