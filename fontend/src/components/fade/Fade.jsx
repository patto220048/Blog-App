import { useContext } from 'react';
import style from './Fade.module.scss';
import { ThemeContext } from '../../context/ThemeContext';
import Post from '../post/Post';
import Search from '../search/Search';

function Fade() {
    const { theme } = useContext(ThemeContext);
    const arrs = [{ title: 'john' }, { title: 'lisa' }, { title: 'macus' }, { title: 'jack' }];
    return (
        <div className={`${style.fade} ${style[theme]}`}>
            <Search />
            <span className={style.name}>All posts</span>
            <div className={style.wapper}>
                {arrs.map((arr, i) => (
                    <div>
                        <Post key={i} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Fade;
