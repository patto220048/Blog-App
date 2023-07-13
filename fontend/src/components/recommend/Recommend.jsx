import { Link } from 'react-router-dom';
import style from './Recommend.module.scss';

import { useContext} from 'react';
import { ThemeContext } from '../../context/ThemeContext';


function Recommend() {
    const { theme } = useContext(ThemeContext);
    return (
        <div className={`${style.recommend} ${style[theme]}`}>
            <div className={style.items}>
                <Link to="/blog/post/123" style={{ textDecoration: 'none'}}>
                    <h2>Grid system for better Design User Interface</h2>
                </Link>
                <ul className={style.tags}>
                    <li className={style.tag}>#react</li>
                    <li className={style.tag}>#javascript</li>
                    <li className={style.tag}>#javascript</li>
                    <li className={style.tag}>#javascript</li>
                    <li className={style.tag}>#javascript</li>
                    <li className={style.tag}>#javascript</li>
                </ul>
            </div>
        </div>
    );
}

export default Recommend;
