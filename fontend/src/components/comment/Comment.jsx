import { useContext, useEffect, useState } from 'react';
import styled from './Comment.module.scss';
import { ThemeContext } from '../../context/ThemeContext';

function Comment() {
    const { theme, setTheme } = useContext(ThemeContext);
    const isDarkTheme = theme === 'dark';
    const isLightTheme = theme === 'light';
    const [onOptionComment, setOnOptionComment] = useState(false);
    const toggleOpenOptionComment = (e) =>{
        e.stopPropagation();
        setOnOptionComment(!onOptionComment)
    }
    useEffect(() => {
        const handleClickOutside = () => {
            setOnOptionComment(false);
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);
    return (
        <div className={styled.comment}>
            <div className={styled.avatar}>
                <div className={styled.avatarItem}>
                    <img src="" alt="" />
                    <h2>@name</h2>
                    <span>time</span>
                </div>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim suscipit cumque ipsam velit
                    reprehenderit optio minima doloribus aut, aperiam illo quo, hic vitae porro quos voluptate non autem
                    eveniet voluptatum.
                </p>
            </div>
            <div className={styled.option}>
                <ul className={styled.item}>
                    <li>
                        {isLightTheme ? (
                            <svg
                                width="22"
                                height="22"
                                viewBox="0 0 40 38"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M28.0053 0.00522276C25.0652 -0.083337 22.2028 0.957153 20.0059 2.91302C17.8089 0.957153 14.9465 -0.083337 12.0064 0.00522276C8.52656 -0.00666952 5.22437 1.54096 3.00704 4.22293C1.10117 6.53477 -0.89469 10.7205 0.427219 17.544C2.53907 28.4353 18.358 37.3746 19.0259 37.7426C19.6313 38.0802 20.3684 38.0802 20.9738 37.7426C21.6478 37.3686 37.4667 28.4293 39.5725 17.544C40.8944 10.7205 38.9006 6.54477 36.9947 4.22293C34.7799 1.54321 31.4818 -0.00424021 28.0053 0.00522276ZM35.2697 16.8562C33.8172 24.3564 23.2639 31.3341 20.0119 33.3266C16.7599 31.3341 6.2066 24.3583 4.75413 16.8562C3.75397 11.6975 5.12261 8.70088 6.44835 7.09438C7.86924 5.37998 9.98284 4.39148 12.2095 4.4C14.5965 4.22098 16.9023 5.30834 18.2826 7.264C18.6211 7.8895 19.2734 8.28102 19.9846 8.28561H20.008C20.7145 8.28072 21.3644 7.89851 21.712 7.2835C23.0908 5.31233 25.4081 4.21593 27.8065 4.4C30.0359 4.38915 32.1529 5.37786 33.5755 7.09438C34.8973 8.70088 36.266 11.6975 35.2658 16.8562H35.2697Z"
                                    fill="#333333"
                                />
                            </svg>
                        ) : (
                            <svg
                                width="22"
                                height="22"
                                viewBox="0 0 40 38"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M28.0053 0.00522276C25.0652 -0.083337 22.2028 0.957153 20.0059 2.91302C17.8089 0.957153 14.9465 -0.083337 12.0064 0.00522276C8.52656 -0.00666952 5.22437 1.54096 3.00704 4.22293C1.10117 6.53477 -0.89469 10.7205 0.427219 17.544C2.53907 28.4353 18.358 37.3746 19.0259 37.7426C19.6313 38.0802 20.3684 38.0802 20.9738 37.7426C21.6478 37.3686 37.4667 28.4293 39.5725 17.544C40.8944 10.7205 38.9006 6.54477 36.9947 4.22293C34.7799 1.54321 31.4818 -0.00424021 28.0053 0.00522276ZM35.2697 16.8562C33.8172 24.3564 23.2639 31.3341 20.0119 33.3266C16.7599 31.3341 6.2066 24.3583 4.75413 16.8562C3.75397 11.6975 5.12261 8.70088 6.44835 7.09438C7.86924 5.37998 9.98284 4.39148 12.2095 4.4C14.5965 4.22098 16.9023 5.30834 18.2826 7.264C18.6211 7.8895 19.2734 8.28102 19.9846 8.28561H20.008C20.7145 8.28072 21.3644 7.89851 21.712 7.2835C23.0908 5.31233 25.4081 4.21593 27.8065 4.4C30.0359 4.38915 32.1529 5.37786 33.5755 7.09438C34.8973 8.70088 36.266 11.6975 35.2658 16.8562H35.2697Z"
                                    fill="white"
                                />
                            </svg>
                        )}
                        <span>2</span>
                    </li>
                    <li>
                        {isLightTheme ? (
                           <svg width="22" height="22" viewBox="0 0 40 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                           <path fillRule="evenodd" clipRule="evenodd" d="M34 0C37.3137 0 40 2.68629 40 6V22C40 25.3137 37.3137 28 34 28H19.3333C18.9006 28 18.4795 28.1404 18.1333 28.4L11.2 33.6C9.88153 34.5889 8 33.6481 8 32V28H6C2.68629 28 0 25.3137 0 22V6C0 2.68629 2.68629 0 6 0H34ZM34 4H6C4.89543 4 4 4.89543 4 6V22C4 23.1046 4.89543 24 6 24H10C11.1046 24 12 24.8954 12 26V28L15.7333 25.2C16.7719 24.4211 18.0351 24 19.3333 24H34C35.1046 24 36 23.1046 36 22V6C36 4.89543 35.1046 4 34 4ZM12 12C13.1046 12 14 12.8954 14 14C14 15.1046 13.1046 16 12 16C10.8954 16 10 15.1046 10 14C10 12.8954 10.8954 12 12 12ZM20 12C21.1046 12 22 12.8954 22 14C22 15.1046 21.1046 16 20 16C18.8954 16 18 15.1046 18 14C18 12.8954 18.8954 12 20 12ZM28 12C29.1046 12 30 12.8954 30 14C30 15.1046 29.1046 16 28 16C26.8954 16 26 15.1046 26 14C26 12.8954 26.8954 12 28 12Z" fill="black"/>
                           </svg>
                           
                        ) : (
                            <svg
                                width="22"
                                height="22"
                                viewBox="0 0 40 35"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M34 0C37.3137 0 40 2.68629 40 6V22C40 25.3137 37.3137 28 34 28H19.3333C18.9006 28 18.4795 28.1404 18.1333 28.4L11.2 33.6C9.88153 34.5889 8 33.6481 8 32V28H6C2.68629 28 0 25.3137 0 22V6C0 2.68629 2.68629 0 6 0H34ZM34 4H6C4.89543 4 4 4.89543 4 6V22C4 23.1046 4.89543 24 6 24H10C11.1046 24 12 24.8954 12 26V28L15.7333 25.2C16.7719 24.4211 18.0351 24 19.3333 24H34C35.1046 24 36 23.1046 36 22V6C36 4.89543 35.1046 4 34 4ZM12 12C13.1046 12 14 12.8954 14 14C14 15.1046 13.1046 16 12 16C10.8954 16 10 15.1046 10 14C10 12.8954 10.8954 12 12 12ZM20 12C21.1046 12 22 12.8954 22 14C22 15.1046 21.1046 16 20 16C18.8954 16 18 15.1046 18 14C18 12.8954 18.8954 12 20 12ZM28 12C29.1046 12 30 12.8954 30 14C30 15.1046 29.1046 16 28 16C26.8954 16 26 15.1046 26 14C26 12.8954 26.8954 12 28 12Z"
                                    fill="white"
                                />
                            </svg>
                        )}
                        <span>2</span>
                    </li>
                    <li onClick={toggleOpenOptionComment}>
                        <div >
                        {isLightTheme ?(
                            <svg
                                width="22"
                                height="22"
                                viewBox="0 0 40 12"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M34.68 11.3191C37.6177 11.3191 39.9991 8.93768 39.9991 6C39.9991 3.06231 37.6177 0.680847 34.68 0.680847C31.7423 0.680847 29.3608 3.06231 29.3608 6C29.3608 8.93768 31.7423 11.3191 34.68 11.3191ZM25.3183 6C25.3183 3.06231 22.9368 0.680847 19.9991 0.680847C17.0615 0.680847 14.68 3.06231 14.68 6C14.68 8.93768 17.0615 11.3191 19.9991 11.3191C22.9368 11.3191 25.3183 8.93768 25.3183 6ZM10.6374 6C10.6374 3.06231 8.25598 0.680847 5.31829 0.680847C2.38061 0.680847 -0.000854492 3.06231 -0.000854492 6C-0.000854492 8.93768 2.38061 11.3191 5.31829 11.3191C8.25598 11.3191 10.6374 8.93768 10.6374 6Z"
                                    fill="#333333"
                                />
                            </svg>
                        ) : (
                            <svg
                                width="22"
                                height="22"
                                viewBox="0 0 40 12"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M34.68 11.3191C37.6177 11.3191 39.9991 8.93768 39.9991 6C39.9991 3.06231 37.6177 0.680847 34.68 0.680847C31.7423 0.680847 29.3608 3.06231 29.3608 6C29.3608 8.93768 31.7423 11.3191 34.68 11.3191ZM25.3183 6C25.3183 3.06231 22.9368 0.680847 19.9991 0.680847C17.0615 0.680847 14.68 3.06231 14.68 6C14.68 8.93768 17.0615 11.3191 19.9991 11.3191C22.9368 11.3191 25.3183 8.93768 25.3183 6ZM10.6374 6C10.6374 3.06231 8.25598 0.680847 5.31829 0.680847C2.38061 0.680847 -0.000854492 3.06231 -0.000854492 6C-0.000854492 8.93768 2.38061 11.3191 5.31829 11.3191C8.25598 11.3191 10.6374 8.93768 10.6374 6Z"
                                    fill="white"
                                />
                            </svg>
                        )}
                        </div>
                        {onOptionComment && 
                        <div className={styled.optionComment}>
                            <ul className={styled.optionItem}>
                                <li className={styled.itemComment}>Delete</li>
                                <li className={styled.itemComment}>Report</li>
                                
                            </ul>
                        </div>
                        }
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Comment;
