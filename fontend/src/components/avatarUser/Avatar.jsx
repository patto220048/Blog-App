import { useContext, useEffect, useState } from 'react';
import style from './Avatar.module.scss';
import Tippy from '@tippyjs/react';
import { ThemeContext } from '../../context/ThemeContext';
import { Link } from 'react-router-dom';

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
                <div className={style.addPost}>
                    <Link to="/bolg/create">
                        <span>add</span>
                    </Link>
                </div>
                <Tippy content={<span className={`${style.span}`}>DINH HUU PHAT</span>}>
                    <img
                        src="https://images.unsplash.com/photo-1684785459021-761c8ee14e49?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                        alt=""
                        onClick={toggleMenu}
                    />
                </Tippy>
                {/* <span >
                    {(isLightTheme && (
                        <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M25.0653 34.5111L37.7794 20.4247C38.0735 20.0988 38.0735 19.5704 37.7794 19.2444C37.6381 19.0879 37.4465 19 37.2467 19H10.7533C10.3372 19 10 19.3736 10 19.8346C10 20.0559 10.0794 20.2682 10.2206 20.4247L22.9347 34.5111C23.5231 35.163 24.4769 35.163 25.0653 34.5111Z"
                                fill="#333333"
                            />
                        </svg>
                    )) ||
                        (isDarkTheme && (
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 48 48"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M25.0653 34.5111L37.7794 20.4247C38.0735 20.0988 38.0735 19.5704 37.7794 19.2444C37.6381 19.0879 37.4465 19 37.2467 19H10.7533C10.3372 19 10 19.3736 10 19.8346C10 20.0559 10.0794 20.2682 10.2206 20.4247L22.9347 34.5111C23.5231 35.163 24.4769 35.163 25.0653 34.5111Z"
                                    fill="white"
                                />
                            </svg>
                        ))}
                </span> */}
            </div>
            {onMenu && (
                <div className={`${style.menu}`}>
                    <ul className={`${style.listItems} ${style[theme]}`}>
                        <li className={style.item}>Role: Admin</li>
                        <li className={style.item}>Infimaton</li>
                        <li className={style.item}>Log out</li>
                    </ul>
                </div>
            )}
        </div>
    );
}

export default Avatar;
