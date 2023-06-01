import { useContext } from "react";
import style from "./DetailPost.module.scss"
import { ThemeContext } from "../../context/ThemeContext";
function DetailPost() {
    const { theme } = useContext(ThemeContext);
    console.log(theme)

    return ( 
        <div className={`${style.containerDetail} ${style[theme]}`}>  
            <div className={style.postFlow}>
                1
            </div>
            <div className={style.wapper}>
                <img src="https://images.unsplash.com/photo-1685444213745-fab7153181f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60" alt="" />
                <div className={style.head}>
                      <span className={style.time}>4 Jan 2020
                </span>
                <span className={style.title}>
                    Grid system for better Design User Interface
                </span>

                </div>
              

                <div className={style.content}>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga temporibus deserunt ipsam, reprehenderit repellendus nam nemo delectus eum magni corporis! Praesentium dicta illum, consectetur quos cupiditate commodi impedit ratione iure.</p>
                </div>
            </div>
            <div className={style.recomment}>
                2
            </div>
        </div>
     );
}

export default DetailPost;