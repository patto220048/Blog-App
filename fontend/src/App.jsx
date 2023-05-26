import './App.scss';
import { createBrowserRouter, RouterProvider, Outlet, Navigate } from 'react-router-dom';

import Home from './pages/home/Home';
import NavBar from './layouts/nav/Navbar';
function App() {
    //Protect router
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
           <>
           <div className="main">
                <header>
                    <NavBar/>
                </header>
                <div className="wapper">
                    <Outlet/>
                </div>
                <footer>

                </footer>
           </div>
           </>
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
