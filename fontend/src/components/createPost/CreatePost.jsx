import { useState } from 'react';
import style from './CreatePost.module.scss';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
function CreatePost() {
    const [value, setValue] = useState('');
    console.log(value);
    const modules = {
        toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike','code-block', 'blockquote'],
            [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
            [{ 'color': [] }, { 'background': [] }], 
            ['link', 'image']
            ['clean'],
        ],
    };
    const formats  = [
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
        'image',
    ];
    return (
        <div className={style.cratePost}>
            <div className={style.editer}>
                <div>
                <span>Title</span>
                <input type="text" />
                </div>
                <ReactQuill 
                theme="snow" 
                value={value} 
                onChange={setValue}
                modules={modules}
                formats={formats}
                />
            </div>
            <div className={style.editerRight}>
                <div className={style.rightItem}>
                    1
                </div>
            </div>

           
        </div>
    );
}


export default CreatePost;
