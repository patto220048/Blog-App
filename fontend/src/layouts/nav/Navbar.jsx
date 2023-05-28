import { ThemeContext } from '../../context/ThemeContext';
import { useContext, useState } from 'react';
import Search from '../../components/search/Search';
import style from './NavBar.module.scss';
import Avatar from '../../components/avatarUser/Avatar';
function NavBar() {
    const { theme, setTheme } = useContext(ThemeContext);
    const isDarkTheme = theme === 'dark';
    const isLightTheme = theme === 'light';

    return (
        <nav className={`${style.nav} ${style[theme]}`}>
            <h1 className="text">Logo</h1>
            <ul>
                <li>
                    <span> Home</span>
                </li>
                <li>
                    <span>Blog</span>
                </li>
                <li>
               
                    <span>Project</span>
                </li>
                <li>
                  
                    <span>Contact</span>
                </li>
                <li>
                    <div onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
                        {(isDarkTheme && (
                            <span>
                                <svg
                                    width="22"
                                    height="22"
                                    viewBox="0 0 32 32"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M16 25C16.5128 25 16.9355 25.386 16.9933 25.8834L17 26V29C17 29.5523 16.5523 30 16 30C15.4872 30 15.0645 29.614 15.0067 29.1166L15 29V26C15 25.4477 15.4477 25 16 25Z"
                                        fill="url(#paint0_linear_402_4102)"
                                    />
                                    <path
                                        d="M22.0712 22.0711C22.4317 21.7106 22.9989 21.6829 23.3912 21.9879L23.4854 22.0711L25.6067 24.1924C25.9973 24.5829 25.9973 25.2161 25.6067 25.6066C25.2463 25.9671 24.679 25.9948 24.2867 25.6898L24.1925 25.6066L22.0712 23.4853C21.6807 23.0948 21.6807 22.4616 22.0712 22.0711Z"
                                        fill="url(#paint1_linear_402_4102)"
                                    />
                                    <path
                                        d="M8.5148 22.0711C8.90532 21.6806 9.53849 21.6806 9.92901 22.0711C10.2895 22.4316 10.3172 22.9988 10.0122 23.3911L9.92901 23.4853L7.80769 25.6066C7.41717 25.9971 6.784 25.9971 6.39348 25.6066C6.033 25.2461 6.00527 24.6789 6.31029 24.2866L6.39348 24.1924L8.5148 22.0711Z"
                                        fill="url(#paint2_linear_402_4102)"
                                    />
                                    <path
                                        d="M29 15C29.5523 15 30 15.4477 30 16C30 16.5128 29.614 16.9355 29.1166 16.9933L29 17H26C25.4477 17 25 16.5523 25 16C25 15.4872 25.386 15.0645 25.8834 15.0067L26 15H29Z"
                                        fill="url(#paint3_linear_402_4102)"
                                    />
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M10 16C10 12.6863 12.6863 10 16 10C19.3137 10 22 12.6863 22 16C22 19.3137 19.3137 22 16 22C12.6863 22 10 19.3137 10 16ZM20 16C20 13.7909 18.2091 12 16 12C13.7909 12 12 13.7909 12 16C12 18.2091 13.7909 20 16 20C18.2091 20 20 18.2091 20 16Z"
                                        fill="url(#paint4_linear_402_4102)"
                                    />
                                    <path
                                        d="M6 15C6.55228 15 7 15.4477 7 16C7 16.5128 6.61396 16.9355 6.11662 16.9933L6 17H3C2.44772 17 2 16.5523 2 16C2 15.4872 2.38604 15.0645 2.88338 15.0067L3 15H6Z"
                                        fill="url(#paint5_linear_402_4102)"
                                    />
                                    <path
                                        d="M24.4855 6.10051C24.876 5.70999 25.5092 5.70999 25.8997 6.10051C26.2602 6.46099 26.2879 7.02823 25.9829 7.42052L25.8997 7.51472L23.7784 9.63604C23.3879 10.0266 22.7547 10.0266 22.3642 9.63604C22.0037 9.27556 21.976 8.70833 22.281 8.31604L22.3642 8.22183L24.4855 6.10051Z"
                                        fill="url(#paint6_linear_402_4102)"
                                    />
                                    <path
                                        d="M6.10051 6.10051C6.46099 5.74003 7.02823 5.7123 7.42052 6.01732L7.51472 6.10051L9.63604 8.22183C10.0266 8.61236 10.0266 9.24552 9.63604 9.63604C9.27556 9.99653 8.70833 10.0243 8.31604 9.71923L8.22183 9.63604L6.10051 7.51472C5.70999 7.1242 5.70999 6.49103 6.10051 6.10051Z"
                                        fill="url(#paint7_linear_402_4102)"
                                    />
                                    <path
                                        d="M16 2C16.5128 2 16.9355 2.38604 16.9933 2.88338L17 3V6C17 6.55228 16.5523 7 16 7C15.4872 7 15.0645 6.61396 15.0067 6.11662L15 6V3C15 2.44772 15.4477 2 16 2Z"
                                        fill="url(#paint8_linear_402_4102)"
                                    />
                                    <defs>
                                        <linearGradient
                                            id="paint0_linear_402_4102"
                                            x1="16"
                                            y1="25"
                                            x2="16"
                                            y2="30"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="#D771F1" />
                                            <stop offset="0.494792" stopColor="#F3E5F4" stopOpacity="0.95" />
                                            <stop offset="1" stopColor="#E6E7FD" stopOpacity="0.86" />
                                        </linearGradient>
                                        <linearGradient
                                            id="paint1_linear_402_4102"
                                            x1="23.839"
                                            y1="21.7782"
                                            x2="23.839"
                                            y2="25.8995"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="#D771F1" />
                                            <stop offset="0.494792" stopColor="#F3E5F4" stopOpacity="0.95" />
                                            <stop offset="1" stopColor="#E6E7FD" stopOpacity="0.86" />
                                        </linearGradient>
                                        <linearGradient
                                            id="paint2_linear_402_4102"
                                            x1="8.16125"
                                            y1="21.7782"
                                            x2="8.16125"
                                            y2="25.8995"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="#D771F1" />
                                            <stop offset="0.494792" stopColor="#F3E5F4" stopOpacity="0.95" />
                                            <stop offset="1" stopColor="#E6E7FD" stopOpacity="0.86" />
                                        </linearGradient>
                                        <linearGradient
                                            id="paint3_linear_402_4102"
                                            x1="27.5"
                                            y1="15"
                                            x2="27.5"
                                            y2="17"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="#D771F1" />
                                            <stop offset="0.494792" stopColor="#F3E5F4" stopOpacity="0.95" />
                                            <stop offset="1" stopColor="#E6E7FD" stopOpacity="0.86" />
                                        </linearGradient>
                                        <linearGradient
                                            id="paint4_linear_402_4102"
                                            x1="16"
                                            y1="10"
                                            x2="16"
                                            y2="22"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="#D771F1" />
                                            <stop offset="0.494792" stopColor="#F3E5F4" stopOpacity="0.95" />
                                            <stop offset="1" stopColor="#E6E7FD" stopOpacity="0.86" />
                                        </linearGradient>
                                        <linearGradient
                                            id="paint5_linear_402_4102"
                                            x1="4.5"
                                            y1="15"
                                            x2="4.5"
                                            y2="17"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="#D771F1" />
                                            <stop offset="0.494792" stopColor="#F3E5F4" stopOpacity="0.95" />
                                            <stop offset="1" stopColor="#E6E7FD" stopOpacity="0.86" />
                                        </linearGradient>
                                        <linearGradient
                                            id="paint6_linear_402_4102"
                                            x1="24.1319"
                                            y1="5.80762"
                                            x2="24.1319"
                                            y2="9.92894"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="#D771F1" />
                                            <stop offset="0.494792" stopColor="#F3E5F4" stopOpacity="0.95" />
                                            <stop offset="1" stopColor="#E6E7FD" stopOpacity="0.86" />
                                        </linearGradient>
                                        <linearGradient
                                            id="paint7_linear_402_4102"
                                            x1="7.86828"
                                            y1="5.80762"
                                            x2="7.86828"
                                            y2="9.92894"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="#D771F1" />
                                            <stop offset="0.494792" stopColor="#F3E5F4" stopOpacity="0.95" />
                                            <stop offset="1" stopColor="#E6E7FD" stopOpacity="0.86" />
                                        </linearGradient>
                                        <linearGradient
                                            id="paint8_linear_402_4102"
                                            x1="16"
                                            y1="2"
                                            x2="16"
                                            y2="7"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="#D771F1" />
                                            <stop offset="0.494792" stopColor="#F3E5F4" stopOpacity="0.95" />
                                            <stop offset="1" stopColor="#E6E7FD" stopOpacity="0.86" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </span>
                        )) ||
                            (isLightTheme && (
                                <span>
                                    <svg
                                        width="22"
                                        height="22"
                                        viewBox="0 0 22 22"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M9.49752 0.101936L9.56351 0.0937585C10.4476 -0.0158049 11.0229 0.998248 10.4752 1.70091C9.52423 2.92104 9 4.41924 9 5.99997C9 9.86596 12.134 13 16 13C17.5806 13 19.0788 12.4758 20.2989 11.5249C21.0042 10.9752 22.0212 11.5569 21.9051 12.4435C21.1926 17.8851 16.5378 22 11 22C4.92487 22 0 17.0751 0 11C0 5.48958 4.07511 0.850033 9.49752 0.101936ZM7.5488 2.89863L7.647 2.64497L7.48791 2.70976C4.2423 4.08502 2 7.3033 2 11C2 15.9705 6.02944 20 11 20C14.731 20 17.9727 17.7163 19.326 14.4255L19.354 14.353L19.1012 14.4512C18.2302 14.7708 17.3065 14.9558 16.3572 14.993L16 15C11.0294 15 7 10.9705 7 5.99997C7 4.92518 7.18927 3.87848 7.5488 2.89863Z"
                                            fill="url(#paint0_linear_602_2592)"
                                        />
                                        <defs>
                                            <linearGradient
                                                id="paint0_linear_602_2592"
                                                x1="-10.9571"
                                                y1="11.0428"
                                                x2="10.9573"
                                                y2="32.957"
                                                gradientUnits="userSpaceOnUse"
                                            >
                                                <stop stopColor="#A300FF" />
                                                <stop offset="0.511423" stopColor="#2C00FF" />
                                                <stop offset="1" stopColor="#00AFFF" />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                </span>
                            ))}
                    </div>
                </li>
                <li>
                    {/* <button className='btn'>Login</button> */}
                    <span >
                        <Avatar />
                    </span>
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;
