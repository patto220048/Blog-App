import { useContext } from "react";
import { darkIcon } from "../../svg/Icon";
import styled from "./Contact.module.scss"
import { ThemeContext } from "../../context/ThemeContext";

function Contact() {
    const { theme } = useContext(ThemeContext);
    return ( 
        <section className={`${styled.contactContainer} ${styled[theme]}`}>
            <h1>contact test</h1>

        </section>
     );
}

export default Contact;