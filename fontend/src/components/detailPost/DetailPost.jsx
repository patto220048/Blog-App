import { useContext, useEffect, useState } from 'react';
import style from './DetailPost.module.scss';
import { ThemeContext } from '../../context/ThemeContext';
import Recommend from '../recommend/Recommend';
import ReactMarkdown from 'react-markdown';
import parse, { domToReact, attributesToProps } from 'html-react-parser';
import Comments from '../comments/Comments';
import 'react-quill/dist/quill.snow.css';
function DetailPost() {
    const { theme } = useContext(ThemeContext);
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
            inline: 'center'
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
            <div className={style.postLike}>
                <div className={style.likeItem}>
                    <div>
                        <svg width="26" height="26" viewBox="0 0 40 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M12.8677 11.0302L1.75478 12.9403L1.59595 12.9735C0.0397321 13.3584 -0.546102 15.3004 0.599797 16.4718L8.46005 24.5071L6.85503 35.598L6.8381 35.7534C6.7218 37.3453 8.40186 38.5021 9.87882 37.7806L20 32.8356L30.1212 37.7806L30.2647 37.8446C31.7527 38.4464 33.3792 37.2165 33.145 35.598L31.5389 24.5071L39.4002 16.4718L39.509 16.3522C40.5403 15.132 39.8653 13.2188 38.2452 12.9403L27.1313 11.0302L21.8688 1.11963C21.076 -0.373209 18.924 -0.373209 18.1312 1.11963L12.8677 11.0302Z"
                                fill={theme === 'light' ? '#000000' : '#FFFFFF'}
                            />
                        </svg>
                    </div>
                    <span>2</span>
                    <div>
                        <svg width="26" height="26" viewBox="0 0 40 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M34.68 11.3191C37.6177 11.3191 39.9991 8.93768 39.9991 6C39.9991 3.06231 37.6177 0.680847 34.68 0.680847C31.7423 0.680847 29.3608 3.06231 29.3608 6C29.3608 8.93768 31.7423 11.3191 34.68 11.3191ZM25.3183 6C25.3183 3.06231 22.9368 0.680847 19.9991 0.680847C17.0615 0.680847 14.68 3.06231 14.68 6C14.68 8.93768 17.0615 11.3191 19.9991 11.3191C22.9368 11.3191 25.3183 8.93768 25.3183 6ZM10.6374 6C10.6374 3.06231 8.25598 0.680847 5.31829 0.680847C2.38061 0.680847 -0.000854492 3.06231 -0.000854492 6C-0.000854492 8.93768 2.38061 11.3191 5.31829 11.3191C8.25598 11.3191 10.6374 8.93768 10.6374 6Z"
                                fill={theme === 'light' ? '#000000' : '#FFFFFF'}
                            />
                        </svg>
                    </div>
                </div>
            </div>
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
