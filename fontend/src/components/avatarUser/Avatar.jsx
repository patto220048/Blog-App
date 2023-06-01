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
                <Tippy content = {<span  className={`${style.span}`}>Create post</span>}>
                <div className={style.addPost}>
                    <Link to="/blog/create">
                        {(isLightTheme && (
                            <span>
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 35 35"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M18 0C19.5464 0 20.8 1.2536 20.8 2.8L20.799 15.2H33.2C34.7464 15.2 36 16.4536 36 18C36 19.5464 34.7464 20.8 33.2 20.8L20.799 20.799L20.8 33.2C20.8 34.7464 19.5464 36 18 36C16.4536 36 15.2 34.7464 15.2 33.2V20.799L2.8 20.8C1.2536 20.8 0 19.5464 0 18C0 16.4536 1.2536 15.2 2.8 15.2H15.2V2.8C15.2 1.2536 16.4536 0 18 0Z"
                                        fill="#505D6F"
                                    />
                                </svg>
                            </span>
                        )) ||
                            (isDarkTheme && (
                                <span>
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 36 36"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M18 0C19.5464 0 20.8 1.2536 20.8 2.8L20.799 15.2H33.2C34.7464 15.2 36 16.4536 36 18C36 19.5464 34.7464 20.8 33.2 20.8L20.799 20.799L20.8 33.2C20.8 34.7464 19.5464 36 18 36C16.4536 36 15.2 34.7464 15.2 33.2V20.799L2.8 20.8C1.2536 20.8 0 19.5464 0 18C0 16.4536 1.2536 15.2 2.8 15.2H15.2V2.8C15.2 1.2536 16.4536 0 18 0Z"
                                            fill="white"
                                        />
                                    </svg>
                                </span>
                            ))}
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
