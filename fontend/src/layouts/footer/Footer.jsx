import { useContext } from 'react';
import styled from './Footer.module.scss';
import { ThemeContext } from '../../context/ThemeContext';
import { facbookIcon, githubIcon, instagramIcon } from '../../svg/Icon';

function Footer() {
    const { theme } = useContext(ThemeContext);
    return (
        <section className={`${styled.footer} ${styled[theme]} `}>
            <div className={styled.wapper}>
                <div className={styled.footerItems}>
                    <ul className={styled.supports}>
                        <span>Privacy & Policy</span>
                        <li className={styled.support}>
                            <a href="#">Privacy policy</a>
                            <a href="#">Terms of service</a>
                        </li>
                    </ul>
                    <ul className={styled.menus}>
                        <span>Menu</span>
                        <li className={styled.menu}>
                            <a href="#">Home</a>
                            <a href="#">Blog</a>
                            <a href="#">Project</a>
                            <a href="#">Contact</a>
                        </li>
                    </ul>
                    <ul className={styled.socials}>
                        <span>Social</span>
                        <li className={styled.social}>
                            <a href="#">
                                {theme === 'light' ? facbookIcon('#333333', 25, 25) : facbookIcon('#FFFFFF', 25, 25)}
                            </a>
                            <a href="#">
                                {theme === 'light' ? githubIcon('#333333', 27, 27) : githubIcon('#FFFFFF', 27, 27)}
                            </a>
                            <a href="#">
                                {theme === 'light'
                                    ? instagramIcon('#333333', 25, 25)
                                    : instagramIcon('#FFFFFF', 25, 25)}
                            </a>
                        </li>
                    </ul>
                </div>

                <p className={styled.copyRight}>
                    ©2023<a href="#">DINH HUU PHAT</a> | All Rights Reserved
                </p>
                <div className={styled.protectIcon}>
                    <a
                        href="//www.dmca.com/Protection/Status.aspx?ID=fafeccb4-7a66-40db-8ed3-03436b38dfbe"
                        title="DMCA.com Protection Status"
                        className="dmca-badge"
                    >
                        {' '}
                        <img
                            src="https://images.dmca.com/Badges/dmca-badge-w100-5x1-06.png?ID=fafeccb4-7a66-40db-8ed3-03436b38dfbe"
                            alt="DMCA.com Protection Status"
                        />
                    </a>
                </div>
            </div>
        </section>
    );
}

export default Footer;
