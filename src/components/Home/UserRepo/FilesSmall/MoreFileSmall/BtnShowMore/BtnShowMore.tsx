import React from 'react';
import style from './BtnShowMore.module.css'

import forward from '../../../../../../assets/img/dots/Forward.png'
import ChooseFolder from './ChooseFolder/ChooseFolder';

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
              <span className={style.name}>{name} {name === 'Move' && <img className={style.img} src={forward} alt='forward' />} </span>
              {name === 'Move' && <ChooseFolder />}
            </button>
           
        </>
    );
});

export default BtnShowMore;