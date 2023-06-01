import { useState, useContext } from 'react';
import './_gobal.scss';
import { createBrowserRouter, RouterProvider, Outlet, Navigate } from 'react-router-dom';
import { ThemeContext } from './context/ThemeContext';
import Home from './pages/home/Home';
import NavBar from './layouts/nav/Navbar';
import style from './App.module.scss';
import BLog from './pages/blog/BLog';
import CreatePost from './components/createPost/CreatePost';
import DetailPost from './components/detailPost/DetailPost';
function App() {
    const { theme } = useContext(ThemeContext);

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
            <div className={`${style.main} ${style[theme]} `}>
                <NavBar />
                <div >
                    <Outlet />
                </div>
            </div>
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
                {
                    path : '/blog',
                    element: <BLog/>
                },
                {
                    path : '/blog/create',
                    element: <CreatePost/>
                },
                {
                    path : '/blog/post/:id',
                    element: <DetailPost/>
                }
            ],
        },
    ]);
    return <RouterProvider router={router} />;
}

export default App;
