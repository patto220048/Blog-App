import style from "./DetailPost.module.scss"
function DetailPost() {
    return ( 
        <div className={style.containerDetail}>
            <div className="postFLow">

            </div>
            <div className={style.wapper}>
                <span className={style.time}>4 Jan 2020
                </span>
                <span className={style.title}>
                    Grid system for better Design User Interface
                </span>
                <img src="" alt="" />

                <div className={style.content}>

                </div>
            </div>
            <div className="recomment">

            </div>
        </div>
     );
}

export default DetailPost;