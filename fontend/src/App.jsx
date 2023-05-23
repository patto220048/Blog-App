import './App.scss';
import { createBrowserRouter, RouterProvider, Outlet, Navigate } from 'react-router-dom';
import NavBar from './layout/nav/Navbar';
import Home from './pages/home/Home';
import styled from 'styled-components';
function App() {
    //Protect router
    const WapperAll = styled.div``;
    const Main = styled.div`
        display: flex;
        justify-content: center;
    `;

    const currentUser = true;

    const ProtectRouter = ({ children }) => {
        if (!currentUser) {
            return <h1>You are not authenticed</h1>;
        }
        return children;
    };
    //Layout
    const Layout = () => {
        return (
            <WapperAll>
                <header>
                    <NavBar />
                </header>
                    <Main>
                        <Outlet />
                    </Main>
                <footer></footer>
            </WapperAll>
        );
    };
    //Router
    const router = createBrowserRouter([
        {
            path: '/',
            element: (
                <ProtectRouter>
                    <Layout />
                </ProtectRouter>
            ),
            children: [
                {
                    path: '/',
                    element: <Home />,
                },
            ],
        },
    ]);
    return <RouterProvider router={router} />;
}

export default App;
