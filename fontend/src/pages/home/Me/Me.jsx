//library
import { useCallback, useContext, useEffect, useRef } from 'react';
import styled from './Me.module.scss';
import Particles from "react-particles";
import { init } from 'ityped'
//---------//
import { loadSlim } from "tsparticles-slim";
import { ThemeContext } from '../../../context/ThemeContext';
function Me() {
    const {theme} = useContext(ThemeContext) 
    // optison particles
    const options = 
    {
        fpsLimit: 120,
        interactivity: {
            events: {
                onClick: {
                    enable: true,
                    mode: "push",
                },
                onHover: {
                    enable: true,
                    mode: "repulse",
                },
                resize: true,
            },
            modes: {
                push: {
                    quantity: 4,
                },
                repulse: {
                    distance: 200,
                    duration: 0.3,
                },
            },
        },
        particles: {
            color: {
                value: '#ADB5BD',
            },
            links: {
                color: "#ADB5BD",
                distance: 150,
                enable: true,
                opacity: 0.4,
                width: 1,
            },
            move: {
                direction: "none",
                enable: true,
                outModes: {
                    default: "bounce",
                },
                random: false,
                speed: 1.1,
                straight: false,
            },
            number: {
                density: {
                    enable: true,
                    area: 800,
                },
                value: 80,
            },
            opacity: {
                value: 0.3,
            },
            shape: {
                type: "circle",
            },
            size: {
                value: { min: 1, max: 5 },
            },
        },
        detectRetina: true,
    }
    const particlesInit = useCallback(async (engine) => {
        await loadSlim(engine);
    }, []);         
    // itype
    const textRef = useRef()
    useEffect(()=>{
        init(textRef.current, { 
            showCursor: true,
            strings: ['PATTO','WEB DEVELOPER'],
            backDelay: 1500,
            typeSpeed:  200,
            cursorChar: "|",

        })

    },[])
    return (
    <div className={`${styled.containerMe} ${styled[theme]}`}>
         <Particles className={styled.particles} options={options} init={particlesInit} />
        <div className={styled.left}>
            <h2>HI, I'M </h2>
            <br />
            <h2><span ref={textRef}></span></h2>
            <p> Fresher Wed Devloper / Blogger</p>
            
        </div>
        <div className={styled.right}>
           

        </div>
    </div>
    );
}

export default Me;
