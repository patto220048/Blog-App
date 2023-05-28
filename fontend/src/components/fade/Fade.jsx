import { useContext } from 'react';
import style from './Fade.module.scss';
import { ThemeContext } from '../../context/ThemeContext';

function Fade() {
    const { theme} = useContext(ThemeContext);
    return (
        <div className={`${style.div} ${style[theme]}`}>
            <h1>112312312</h1>
        </div>
    );
}

export default Fade;
