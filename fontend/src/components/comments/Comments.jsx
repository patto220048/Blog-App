import Comment from "../comment/Comment";
import styled from "./Comments.module.scss"

function Comments() {
    return (
        <div className={styled.comments}>
            <h1>Comments</h1>
            
            <div className={styled.inputComment}>
                <img src="" alt="" />
                <textarea type="text" placeholder="Comment ..." className="none"/>
            </div>
            <Comment/>
            <Comment/>
            <Comment/>
            <Comment/>
        </div>
      );
}

export default Comments;