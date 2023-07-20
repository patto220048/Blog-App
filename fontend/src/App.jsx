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
import Login from './register/login/Login';
import SignUp from './register/signup/SignUp';
import ResetPass from './register/resetPass/ResetPass';
import Footer from './layouts/footer/Footer';

function App() {
    const { theme } = useContext(ThemeContext);
    //Protect router
    const currentUser = true;

    const ProtectRouter = ({ children }) => {
        if (!currentUser) {
            console.log(children);
            return <h1>You are not authenticed</h1>;
        }
        return children;
    };
    //Layout
    const Layout = () => {
        return (
            <div className={`${style.main} ${style[theme]} `}>
                <nav>
                    <NavBar />
                </nav>
                <main>
                    <Outlet />
                </main>
                <footer>
                    <Footer />
                </footer>
            </div>
        );
    };
    //Router
    const router = createBrowserRouter([
        {
            path: '/',
            element: <Layout />,
            children: [
                {
                    path: '/',
                    element: <Home />,
                },
                {
                    path: '/blog',
                    element: <BLog />,
                },
                {
                    path: '/blog/create',
                    element: (
                        <ProtectRouter>
                            <CreatePost />
                        </ProtectRouter>
                    ),
                },
                {
                    path: '/blog/post/:id',
                    element: <DetailPost />,
                },
            ],
        },
        {
            path: '/login',
            element: <Login />,
        },
        {
            path: '/signup',
            element: <SignUp />,
        },
        {
            path: '/reset',
            element: <ResetPass />,
        },
    ]);
    return <RouterProvider router={router} />;
}

export default App;
