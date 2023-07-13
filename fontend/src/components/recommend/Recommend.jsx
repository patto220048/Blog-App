import { Link } from 'react-router-dom';
import style from './Recommend.module.scss';

function Recommend() {
    return (
        <div className={style.recommend}>
            <div className={style.items}>
                <Link to="/blog/post/123">
                    <img
                        src="https://images.unsplash.com/photo-1682685796186-1bb4a5655653?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                        alt=""
                    />
                </Link>
                <Link to="/blog/post/123" style={{ textDecoration: 'none' , color:"black"}}>
                    <h2>Grid system for better Design User Interface</h2>
                </Link>
            </div>
        </div>
    );
}

export default Recommend;
