import { useContext, useState } from 'react';
import style from './CreatePost.module.scss';
import ReactQuill, { Quill } from 'react-quill';
import { ThemeContext } from '../../context/ThemeContext';
import 'react-quill/dist/quill.snow.css';
function CreatePost() {
    const [value, setValue] = useState('');
    const { theme } = useContext(ThemeContext);
    console.log(value);
    const { Quill } = ReactQuill;
    const modules = {
        toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
            [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
            ['link', 'image'],
            [{ script: 'sub' }, { script: 'super' }],
            ['clean'],
            [{ color: [] }, { background: [] }], // dropdown with defaults from theme
            [{ font: [] }],
            [{ align: [] }],
            [{ direction: 'rtl' }],
        ],
    };
    const formats = [
        'header',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'code-block',
        'list',
        'bullet',
        'indent',
        'link',
        'image',
        'color',
        'background',
        'font',
        'align',
        'direction',
        'script',
    ];
    return (
        <div className={`${style.CreatePost} ${style[theme]}`}>
            <div className={style.editerWapper}>
                <div className={style.title}>
                    <span>Title:</span>
                    <input type="text" />
                </div>

                <ReactQuill
                    className={style.qill}
                    theme="snow"
                    value={value}
                    onChange={setValue}
                    modules={modules}
                    formats={formats}
                    placeholder ='Compose an epic...'
                  
                />
            </div>
            <div className={style.editerRight}>
                <h1>Public</h1>
                <div className={`${style.status} ${style[theme]}`}>
                   <span>
                    <b>Status :</b> OKE
                   </span>
                   <span>
                    <b>Visibility :</b> Public
                   </span>
                    <button className='btn'>Create</button>
                </div>
                <h1>Category</h1>
                <div className={style.category}>
                    <div>
                    <input type="radio" name="Nodejs" value="react" id='react' />
                    <label htmlFor="react">React</label>
                    </div>
                    <div>
                    <input type="radio" name="Nodejs" value="nodejs" id='nodejs' />
                    <label htmlFor="nodejs">Node JS</label>
                    </div>
                    <div>
                    <input type="radio" name="Nodejs" value="nodejs" id='nodejs' />
                    <label htmlFor="nodejs">Node JS</label>
                    </div>
                    <div>
                    <input type="radio" name="Nodejs" value="nodejs" id='nodejs' />
                    <label htmlFor="nodejs">Node JS</label>
                    </div>
                   
                </div>
                
                
            </div>
        </div>
    );
}

export default CreatePost;
