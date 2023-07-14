import { useContext } from "react";
import styled from "./Footer.module.scss";
import { ThemeContext } from "../../context/ThemeContext";

function Footer() {
    const {theme} = useContext(ThemeContext)
    return ( 
        <div className={`${styled.footer} ${styled[theme]} `}>
            <div className={styled.wapper}>
                
                <p className={styled.copyRight}>
                    Copyright © 2023 by<a href="#">DINH HUU PHAT</a>
                </p>
            </div>

        </div>
     );
}

export default Footer;