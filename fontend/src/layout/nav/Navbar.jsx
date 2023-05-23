import './Navbar.scss';
import styled from 'styled-components';

function NavBar() {
    const ListItem = styled.li`
        list-style: none;
        font-size: 25px;
        font-weight: 700;
        cursor: pointer;
    `;
 
    const Logo = styled.span``;
    return (
        <>
            <div className="navbar-container">
                <div className="navbar-wapper">
                    <Logo>LOGO</Logo>
                    <ul className="navbar-items">

                      
                    </ul>
                </div>
            </div>
        </>
    );
}

export default NavBar;
