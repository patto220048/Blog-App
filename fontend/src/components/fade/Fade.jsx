import { useContext } from 'react';
import style from './Fade.module.scss';
import { ThemeContext } from '../../context/ThemeContext';
import Post from '../post/Post';

function Fade() {
    const { theme } = useContext(ThemeContext);
    return (
        <div className={`${style.fade} ${style[theme]}`}>
            <span className={style.name}>Recent posts</span>
            <div className={style.wapper}>
                <Post/>
                <Post/>
                <Post/>
                <Post/>
            </div>
        </div>
    );
}

export default Fade;
