import { useContext, useEffect, useState } from 'react';
import style from './DetailPost.module.scss';
import { ThemeContext } from '../../context/ThemeContext';
import Recommend from '../recommend/Recommend';
import ReactMarkdown from 'react-markdown';
import parse, { domToReact, attributesToProps } from 'html-react-parser';
import Comments from '../comments/Comments';
import 'react-quill/dist/quill.snow.css';
import { downIcon, optionIcon, upIcon } from '../../svg/Icon';
function DetailPost() {
    const { theme } = useContext(ThemeContext);
    // open menu post
    const [isMenuPost, setIsMenuPost] = useState(false);
    const toggleMenuPost = (e) => {
        e.stopPropagation();
        setIsMenuPost(!isMenuPost);
    };
    //click outside menu post

    useEffect(() => {
        const handleClickOutside = () => {
            setIsMenuPost(false);
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);
    const markdown = `
    <h1># day la tieu de 1 day la tieu de 1day la tieu de 1day la tieu de 1</h1><p>adadfadf ad fad af a dfa da dfa dfa da df<strong> ad afdada dfa dadadfa daf da dfad </strong></p><p><strong>asd ad </strong>asdf adf adf adf asd s ad</p><p> a</p><p>d</p><p>a d</p><p>adfa dfdf</p>
    <h1># day la tieu de 3</h1>
    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
    <h1># day la tieu de 2</h1>
    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
    <h1># day la tieu de 5</h1>
    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
    `;
    // TODO: add id for h1 , custom text
    useEffect(() => {
        const el = document.body.getElementsByTagName('h1');
        for (let i = 0; i < el.length; i++) {
            el[i].innerHTML = el[i].innerHTML.replace(/#\s/g, '');
            el[i].setAttribute('id', el[i].innerText.toLowerCase().replace(/\s/g, '-'));
        }
    }, []);
    // parse makdown get arr h1
    const getText = (html) => {
        const arrs = [];
        const doc = new DOMParser().parseFromString(html, 'text/html');
        const collection = doc.body.getElementsByTagName('h1');
        for (let i = 0; i < collection.length; i++) {
            arrs.push(collection[i].innerText);
        }
        return arrs;
    };
    const handleScroll = (el) => {
        const element = document.getElementById(el).scrollIntoView({
            behavior: 'auto',
            block: 'center',
            inline: 'center',
        });
    };
    //get h1 element
    const h1Item = getText(markdown);

    // TODO: config markdown
    const ankerLink = ({ node, ...props }) => {
        const id = props.children[0].toLowerCase().replace(/\s/g, '-');
        return (
            <a href={'#' + id} onClick={() => handleScroll(id)}>
                {props.children}
            </a>
        );
    };
    // TODO: config html-react-parser
    return (
        <div className={`${style.containerDetail} ${style[theme]}`}>
            <div className={style.postFlow}>
                <span>On this page</span>
                {h1Item.map((h1, index) => (
                    <ReactMarkdown
                        key={index}
                        allowedElements={['h1', 'h2']}
                        components={{
                            h1: ankerLink,
                            h2: ankerLink,
                        }}
                    >
                        {h1}
                    </ReactMarkdown>
                ))}
            </div>
            <section className={style.postLike}>
                <div className={style.likeItem}>
                    <div>{theme === 'light' ? upIcon('#333333', 24, 24) : upIcon('#FFFFFF', 24, 24)}</div>
                    <span>2</span>
                    <div>{theme === 'light' ? downIcon('#333333', 24, 24) : downIcon('#FFFFFF', 24, 24)}</div>
                    <div onClick={toggleMenuPost}>
                        {theme === 'light' ? optionIcon('#333333', 24, 24) : optionIcon('#ffffff', 24, 24)}
                    </div>
                    {isMenuPost && (
                        <div className={`${style.menu}`}>
                            <ul className={`${style.items} ${style[theme]}`}>
                                <li className={style.item}>
                                    <p>Role: Admin</p>
                                </li>
                                <li className={style.item}>
                                    <p>Role: Admin</p>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </section>

            <div className={style.wapper}>
                <img
                    src="https://images.unsplash.com/photo-1685444213745-fab7153181f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60"
                    alt=""
                />
                <div className={style.head}>
                    <span className={style.time}>4 Jan 2020</span>
                    <span className={style.title}>Grid system for better Design User Interface</span>
                </div>
                <div className="avatar-1 gap">
                    <img
                        src="https://images.unsplash.com/photo-1685444213745-fab7153181f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60"
                        alt=""
                        style={{ width: '40px', height: '40px' }}
                    />
                    <span>@123</span>
                </div>

                <div className={style.content}>{parse(markdown)}</div>
                <div>
                    <Comments />
                </div>
            </div>
            <div className={style.recommend}>
                <Recommend />
            </div>
        </div>
    );
}

export default DetailPost;
