import Search from '../../components/search/Search';
import './NavBar.scss';

function NavBar() {
    return (
        <div className="navbar-container">
            <div className="navbar-wapper">
                <span className="logo">Blog</span>
                <ul className="navbar-items">
                    <li>Home</li>
                    <li>Blog</li>
                    <li>Contact</li>
                </ul>
                <div className="lighmode">
                    <span>11231</span>
                </div>
            </div>

        </div>
    );
}

export default NavBar;
