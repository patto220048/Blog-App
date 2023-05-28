

import style from './Avatar.module.scss'
import Tippy from '@tippyjs/react';

function Avatar() {


    return (  
        <div className={style.div}>
            <img src="https://images.unsplash.com/photo-1684785459021-761c8ee14e49?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" alt="" />
            <Tippy content={<span className={`${style.span}`}>DINH HUU PHAT</span>}>
                <h2>DINH HUU PHAT</h2>
            </Tippy>
        </div>
    );
}

export default Avatar;