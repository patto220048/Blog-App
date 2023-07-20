import { ThemeContext } from '../../context/ThemeContext';
import { useContext, useState } from 'react';
import Search from '../../components/search/Search';
import style from './NavBar.module.scss';
import Avatar from '../../components/avatarUser/Avatar';
import { Link, NavLink } from 'react-router-dom';
import { darkIcon, lightIcon } from '../../svg/Icon';
function NavBar() {
    const { theme, setTheme } = useContext(ThemeContext);
    const isDarkTheme = theme === 'dark';
    const isLightTheme = theme === 'light';
    const handleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
        localStorage.setItem('mode', theme === 'light' ? 'dark' : 'light');
    };
    return (
        <div className={`${style.nav} ${style[theme]}`}>
            <h2 className="text">Logo</h2>
            <ul className={style.listItemNav}>
                <li>
                    <NavLink to="/" style={{ textDecoration: 'none' }}>
                        <span className={`${style[theme]}`}>Home</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/blog" style={{ textDecoration: 'none' }}>
                        <span className={`${style[theme]}`}>Blog</span>
                    </NavLink>
                </li>
                <li>
                    <span>Project</span>
                </li>
                <li>
                    <span>Contact</span>
                </li>
                <li onClick={handleTheme}>
                    {(isDarkTheme && <span>{darkIcon}</span>) || (isLightTheme && <span>{lightIcon}</span>)}
                </li>
            </ul>
            <div>
                <Link to= "/login">
                    <button className="btn">Login</button>
                </Link>
                {/* <Avatar /> */}
            </div>
        </div>
    );
}

export default NavBar;
