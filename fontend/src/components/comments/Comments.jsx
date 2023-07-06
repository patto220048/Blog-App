import Comment from '../comment/Comment';
import styled from './Comments.module.scss';
import ReactQuill, { Quill } from 'react-quill';

function Comments() {
    const modules = {
        toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
            [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
            ['link'],
        
        ],
    };
    const formats = [
        'header',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'indent',
        'link',
      
        'code-block',
    ]
    return (
        <div className={styled.comments}>
            <h2>Comments</h2>

            <div className={styled.inputComment}>
                <div className={styled.currentUserComment}>
                    <img src="" alt="" />
                    <div className={styled.editorComment}>
                        <ReactQuill
                        formats = {formats}
                        modules={modules}
                            style={{backgroundColor: "white", color:"black"}}
                            theme='snow'
                            placeholder="Compose an epic..."
                        />
                    </div>
                </div>
                <div className={styled.btnComment}>
                <button className='btn'>Comment</button>
                </div>
               
            </div>

            <Comment />
            <Comment />
            <Comment />
            <Comment />
        </div>
    );
}

export default Comments;
