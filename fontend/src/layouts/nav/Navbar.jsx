import Search from '../../components/search/Search';
import './NavBar.scss';

function NavBar() {
    return (
        <div className="navbar-container">
            <div className="navbar-wapper">
                <span className="logo">PHAT</span>
                <ul className="navbar-items">
                    <li>HOME</li>
                    <li>BLOG</li>
                    <li>CONTACT</li>
                </ul>
                <div className="lighmode">
                    <span>11231</span>
                </div>
            </div>

        </div>
    );
}

export default NavBar;
