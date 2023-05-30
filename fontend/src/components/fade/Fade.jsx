import { useContext } from 'react';
import style from './Fade.module.scss';
import { ThemeContext } from '../../context/ThemeContext';
import Post from '../post/Post';

function Fade() {
    const { theme } = useContext(ThemeContext);
    const arrs= [{title : "john"},{title : "lisa"},{title : "macus"},{title : "jack"}]
    return (
        <div className={`${style.fade} ${style[theme]}`}>
            <span className={style.name}>All posts</span>
            <div className={style.wapper}>
                {
                    arrs.map(arr => (
                        <div><Post/></div>
                    ))
                }
            </div>
        </div>
    );
}

export default Fade;
