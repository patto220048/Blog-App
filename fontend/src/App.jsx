import './App.scss';
import { createBrowserRouter, RouterProvider, Outlet, Navigate } from 'react-router-dom';
import useFetch from './hooks/useFetch';
import NavBar from './layout/nav/Navbar';
import Home from './pages/home/Home';

function App() {
    //Layout
    const Layout = () => {
        return (
            <>
                <NavBar />
                <Main>
                    <Outlet />
                </Main>
             
            </>
        );
    };
    //Router
    const router = createBrowserRouter([
        {
            path: '/',
            element: (
                <ProtectRouter>
                    {' '}
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
    //Protect router
    const currentUser = true;

    const ProtectRouter = ({ children }) => {
        if (!currentUser) {
            return <h1>You are not authenticed</h1>;
        }
        return children;
    };

    return <RouterProvider router={router} />;
}

export default App;
