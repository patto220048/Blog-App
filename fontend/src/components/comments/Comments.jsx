import Comment from '../comment/Comment';
import styled from './Comments.module.scss';
import ReactQuill, { Quill } from 'react-quill';

function Comments() {
    return (
        <div className={styled.comments}>
            <h1>Comments</h1>

            <div className={styled.inputComment}>
                <img src="" alt="" />
                 <ReactQuill
                    theme='snow'
                    placeholder="Compose an epic..."
                />
                <button>Comment</button>
            </div>
            <Comment />
            <Comment />
            <Comment />
            <Comment />
        </div>
    );
}

export default Comments;
