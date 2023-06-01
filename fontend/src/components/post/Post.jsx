import { useContext } from 'react';
import style from './Post.module.scss';
import { ThemeContext } from '../../context/ThemeContext';
import { Link } from 'react-router-dom';
function Post() {
    const { theme } = useContext(ThemeContext);
    return (
        <div className={`${style.post}`}>
            <Link to = "/blog/post/d1231">
            <img
                src="https://images.unsplash.com/photo-1684997883834-f97052635670?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                alt=""
                style={{maxWidth : "580px" , height: "280px"}}
                />
            </Link>
            <span className={style.date}>1 Jan 2023</span>
            <Link to = "/blog/post/d1231" style={{textDecoration:"none"}}>
                <span className={`${style.postName} ${style[theme]}`}>Ux review presentation</span>
            </Link>
            <p className={style.desc} style={{maxWidth : "580px"}}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam ipsum temporibus iure a totam
                perspiciatis nam autem repellendus accusantium repellat! Saepe neque amet excepturi quod quibusdam
                provident odit ipsam incidunt.

            </p>

            <ul className={style.tags}>
                <li className={style.tagItem}>Design</li>
                <li className={style.tagItem}>Reseach</li>
                <li className={style.tagItem}>Presention</li>
            </ul>
        </div>
    );
}

export default Post;
