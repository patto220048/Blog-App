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
    <h1><strong># day la tieu de 1 </strong></h1><p><em style="color: rgb(32, 33, 34);">Nemo enim ipsam voluptatem, quia voluptas sit, aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos, qui ratione voluptatem sequi nesciunt, neque porro quisquam est, qui do</em><strong style="color: rgb(32, 33, 34);"><em>lorem ipsum</em></strong><em style="color: rgb(32, 33, 34);">, quia&nbsp;</em><strong style="color: rgb(32, 33, 34);"><em>dolor sit, amet, consectetur, adipisci</em></strong><em style="color: rgb(32, 33, 34);">&nbsp;v</em><strong style="color: rgb(32, 33, 34);"><em>elit, sed</em></strong><em style="color: rgb(32, 33, 34);">&nbsp;quia non numquam&nbsp;</em><strong style="color: rgb(32, 33, 34);"><em>eius mod</em></strong><em style="color: rgb(32, 33, 34);">i&nbsp;</em><strong style="color: rgb(32, 33, 34);"><em>tempor</em></strong><em style="color: rgb(32, 33, 34);">a&nbsp;</em><strong style="color: rgb(32, 33, 34);"><em>incidunt, ut labore et dolore magna</em></strong><em style="color: rgb(32, 33, 34);">m&nbsp;</em><strong style="color: rgb(32, 33, 34);"><em>aliqua</em></strong><em style="color: rgb(32, 33, 34);">m quaerat voluptatem.&nbsp;</em><strong style="color: rgb(32, 33, 34);"><em>Ut enim ad minim</em></strong><em style="color: rgb(32, 33, 34);">a&nbsp;</em><strong style="color: rgb(32, 33, 34);"><em>veniam, quis nostru</em></strong><em style="color: rgb(32, 33, 34);">m&nbsp;</em><strong style="color: rgb(32, 33, 34);"><em>exercitation</em></strong><em style="color: rgb(32, 33, 34);">em&nbsp;</em><strong style="color: rgb(32, 33, 34);"><em>ullam co</em></strong><em style="color: rgb(32, 33, 34);">rporis suscipit</em><strong style="color: rgb(32, 33, 34);"><em>&nbsp;laborios</em></strong><em style="color: rgb(32, 33, 34);">am,&nbsp;</em><strong style="color: rgb(32, 33, 34);"><em>nisi ut aliquid ex ea commodi consequat</em></strong><em style="color: rgb(32, 33, 34);">ur?&nbsp;</em><strong style="color: rgb(32, 33, 34);"><em>Quis aute</em></strong><em style="color: rgb(32, 33, 34);">m vel eum&nbsp;</em><strong style="color: rgb(32, 33, 34);"><em>iure reprehenderit,</em></strong><em style="color: rgb(32, 33, 34);">&nbsp;qui&nbsp;</em><strong style="color: rgb(32, 33, 34);"><em>in</em></strong><em style="color: rgb(32, 33, 34);">&nbsp;ea&nbsp;</em><strong style="color: rgb(32, 33, 34);"><em>voluptate velit esse</em></strong><em style="color: rgb(32, 33, 34);">, quam nihil molestiae&nbsp;</em><strong style="color: rgb(32, 33, 34);"><em>c</em></strong><em style="color: rgb(32, 33, 34);">onsequatur, vel&nbsp;</em><strong style="color: rgb(32, 33, 34);"><em>illum</em></strong><em style="color: rgb(32, 33, 34);">, qui&nbsp;</em><strong style="color: rgb(32, 33, 34);"><em>dolore</em></strong><em style="color: rgb(32, 33, 34);">m&nbsp;</em><strong style="color: rgb(32, 33, 34);"><em>eu</em></strong><em style="color: rgb(32, 33, 34);">m&nbsp;</em><strong style="color: rgb(32, 33, 34);"><em>fugiat</em></strong><em style="color: rgb(32, 33, 34);">, quo voluptas&nbsp;</em><strong style="color: rgb(32, 33, 34);"><em>nulla pariatur</em></strong><em style="color: rgb(32, 33, 34);">?</em></p><h1># day la tieu de 2</h1><p><br></p><pre class="ql-syntax" spellcheck="false">const h1 = 10 ;
    </pre><blockquote>text 1 </blockquote><ol><li><strong>list items 1</strong></li><li><strong>list items 2</strong><img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4QC8RXhpZgAASUkqAAgAAAAGABIBAwABAAAAAQAAABoBBQABAAAAVgAAABsBBQABAAAAXgAAACgBAwABAAAAAgAAABMCAwABAAAAAQAAAGmHBAABAAAAZgAAAAAAAAAvGQEA6AMAAC8ZAQDoAwAABgAAkAcABAAAADAyMTABkQcABAAAAAECAwAAoAcABAAAADAxMDABoAMAAQAAAP//AAACoAQAAQAAANwFAAADoAQAAQAAACQEAAAAAAAA/9sAQwABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEB/9sAQwEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEB/8AAEQgEJAXcAwERAAIRAQMRAf/EAB8AAAEDBQEBAQAAAAAAAAAAAAAGBwgCAwQFCQEKC//EAGsQAAEDAgUCBAMFBgQEAgAALwECAwQFEQAGEiExB0EIEyJRFGFxCTKBkaEVI0KxwfAWUtHhCiQzYvEXJTRDcpIYOVOCoiZEdni3wjVzd4eytba40hk3OGNkRUZJVld5g5OXo6TDxMbU1eL/xAAeAQEAAAcBAQEAAAAAAAAAAAAAAQIDBAUGBwgJCv/EAFgRAAEDAwMCBAMFBgUCBAEAGwECAxEABCEFEjEGQRMiUWEHcYEUMpGh8AgjQrHB0RUzUuHxJGIWNENyU4KSsgklc6IXRIMYNWOzwtImRVST0zZGVbTidf/aAAwDAQACEQMRAD8A+4DGYrH0d0mxNiDsbEb7nfa47bHfEqhIjaFZGDwc98jHyM1AiR+Y9iOD+uaRmb+n+VM8IQnMFPW483YInR1NNzG0hCkAIW8zIb0hJAN2CSUpPAJPNutvhP0d19B6hsHnVMgKt3rRy3auUKSgoKUuXNtctBBC3CR4e6QgTAIVvXS3xF6s6RdB0a+ZZt/vOWr7b7lu6sFMLcSzcMuExIEOAQTIJIhlJ/hvaaucu5mmNqSApLNTLD11A3IUqNT4aNJSALagSQbngY8+6z+yJaeIpzpnqy8t2wlJRZ6l4DqC4VkEqVb6ZZpjbsMBaSCmdxkCuy6f+0Y+6QjXunbRTYJBc04PtEiP4Ev392vdJIlSCIIx3rVs9NeoFDGpcKLUWRsX4UmGzZCCNw1IqReJ0m9ggkkEabkDHL9b/Z8+JWhO+Gzp9rrjKCr/AKjT73TLYFtBHn8G81RL0lPm2+Hu7BM4rZ2Pil0HroQE3Vzp7qjKmb5i7WW1uR5VvNWCGSAQUlSXNoAndBmtqy9VYQLc6DJjLbNjrZW4km2q+pkrTuDe+ojnvtjmOo9P67oy1t6pouoWS2TtWpds68g7hvG1y3DzahEfdWoSCJwYruf4XeqDtle212lSSQUXDSTJIEFLmxY7n7vAEYgnNRLQtCR/FvtcAGwvbSqygR3J9/cYi0sOpmCkHI8QFK490EJUAAMSkDB4gxT2KCuDJHGSAJ53iUGY+6CSIzAIqxI8p1BF7EhV
    
         `;
    // TODO: add id for h1 , custom text
    useEffect(() => {
        const el = document.body.getElementsByTagName('h1');
        for (let i = 0; i < el.length; i++) {
            el[i].innerHTML = el[i].innerHTML.replace(/#\s/g, '');
            const id = el[i].setAttribute('id', el[i].innerText.toLowerCase().replace(/\s/g, '-'));

            const scrollElement = document.getElementById(el[i].innerText.toLowerCase().replace(/\s/g, '-'));
            if (scrollElement) {
                // 👇 Will scroll smoothly to the top of the next section
                scrollElement.scrollIntoView({ behavior: 'smooth' });
            }
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
    //get h1 element
    const h1Item = getText(markdown);

    // TODO: config markdown
    const H2 = ({ node, ...props }) => {
        return <h2 id={node.position?.start.line.toString()}>{props.children}</h2>;
    };
    const ankerLink = ({ node, ...props }) => {
        const id = props.children[0].toLowerCase().replace(/\s/g, '-');
        return <a href={'#' + id}>{props.children}</a>;
    };
    // TODO: config html-react-parser
    return (
        <div className={`${style.containerDetail} ${style[theme]}`}>
            <div className={style.postFlow}>
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
