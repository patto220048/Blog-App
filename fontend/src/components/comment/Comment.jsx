import { useContext, useEffect, useState } from 'react';
import styled from './Comment.module.scss';
import { ThemeContext } from '../../context/ThemeContext';
import {
    likeIcon,
    commentIcon,
    optionIcon,
} from '../../svg/Icon';
function Comment() {
    const { theme, setTheme } = useContext(ThemeContext);
    const isDarkTheme = theme === 'dark';
    const isLightTheme = theme === 'light';
    const [onOptionComment, setOnOptionComment] = useState(false);
    const toggleOpenOptionComment = (e) => {
        e.stopPropagation();
        setOnOptionComment(!onOptionComment);
    };
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
                    <img src={import.meta.env.VITE_PUBLIC_FOLDER + '1.jpg'} alt="" />
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
                        {isLightTheme ? likeIcon("#333333",20,20) : likeIcon("#ffffff",20,20)}
                        <span>2</span>
                    </li>
                    <li>
                        {isLightTheme ? commentIcon("#333333",20,20) : commentIcon("#ffffff",20,20)}
                        <span>2</span>
                    </li>
                    <li onClick={toggleOpenOptionComment}>
                        <div>{isLightTheme ? optionIcon("#333333",20,20) : optionIcon("#ffffff",20,20)}</div>
                        {onOptionComment && (
                            <div className={styled.optionComment}>
                                <ul className={styled.optionItem}>
                                    <li className={styled.itemComment}>Delete</li>
                                    <li className={styled.itemComment}>Report</li>
                                </ul>
                            </div>
                        )}
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Comment;
