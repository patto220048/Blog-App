import { useContext, useRef } from 'react';
import Fade from '../../components/fade/Fade';
import Post from '../../components/post/Post';
import styled from'./Home.module.scss';
import { ThemeContext } from '../../context/ThemeContext';
import Me from './Me/Me';
import Ani from './Ani/Ani';

function Home() {
    const {theme} = useContext(ThemeContext)
   
    return (
        <div className={`${styled.containerHome} ${styled[theme]}`}>
            <div className={styled.wapper}>
                    <Me/>
                    <Ani/>
            </div>
            
        </div>

    );
}

export default Home;
