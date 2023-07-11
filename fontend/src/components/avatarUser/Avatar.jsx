import { useContext, useEffect, useState } from 'react';
import style from './Avatar.module.scss';
import Tippy from '@tippyjs/react';
import { ThemeContext } from '../../context/ThemeContext';
import { Link } from 'react-router-dom';
import { plusIcon, infoIcon, logOutIcon, adminIcon, settingIcon } from '../../svg/Icon';

function Avatar() {
    //light mode
    const { theme } = useContext(ThemeContext);
    const isDarkTheme = theme === 'dark';
    const isLightTheme = theme === 'light';
    //open menu
    const [onMenu, setOnMenu] = useState(false);
    const toggleMenu = (e) => {
        e.stopPropagation();
        setOnMenu(!onMenu);
    };
    useEffect(() => {
        const handleClickOutside = () => {
            setOnMenu(false);
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);
    return (
        <div className={style.avatar}>
            <div className={style.wapper}>
                <Tippy content={<span className={`${style.span}`}>Create post</span>}>
                    <div className={style.addPost}>
                        <Link to="/blog/create">
                            {isLightTheme ? plusIcon('#333333', 20, 20) : plusIcon('#ffffff', 20, 20)}
                        </Link>
                    </div>
                </Tippy>

                <Tippy content={<span className={`${style.span}`}>DINH HUU PHAT</span>}>
                    <img
                        src="https://images.unsplash.com/photo-1684785459021-761c8ee14e49?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                        alt=""
                        onClick={toggleMenu}
                    />
                </Tippy>
            </div>
            {onMenu && (
                <div className={`${style.menu}`}>
                    <ul className={`${style.listItems} ${style[theme]}`}>
                        <li className={style.item}>
                            <span>
                                {theme === 'light' ? adminIcon('#FFFFFF', 15, 15) : adminIcon('#333333', 15, 15)}
                            </span>
                            <p>Role: Admin</p>
                        </li>
                        <li className={style.item}>
                            <span>{theme === 'light' ? infoIcon('#FFFFFF', 15, 15) : infoIcon('#333333', 15, 15)}</span>
                            <p>Infimaton</p>{' '}
                        </li>
                        <li className={style.item}>
                            <span>
                                {theme === 'light' ? logOutIcon('#FFFFFF', 15, 15) : logOutIcon('#333333', 15, 15)}
                            </span>
                            <p> Log out</p>
                        </li>
                        <li className={style.item}>
                            <span>
                                {theme === 'light' ? settingIcon('#FFFFFF', 15, 15) : settingIcon('#333333', 15, 15)}
                            </span>
                            <p>Setting</p>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
}

export default Avatar;
