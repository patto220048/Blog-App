import { useContext } from 'react';
import styled from './Login.module.scss';
import { ThemeContext } from '../../context/ThemeContext';
import { Link } from 'react-router-dom';

function Login() {
    const { theme } = useContext(ThemeContext);
    return (
        <div className={styled.login}>
            <div className={styled.wapper}>
                <h1>Login</h1>
                <form>
                    <input type="email" placeholder="Email" />
                    <span>errfa d a dfa df ad</span>

                    <input type="password" placeholder="Password" />
                    <span>123</span>

                    <button type="submit" className="none">
                        Login
                    </button>
                </form>
                <span>
                    <Link>Sign up? </Link>
                    If you don't have account.{' '}
                </span>
                <div >
                    <span>Back to home</span>
                    <span>Reset password | Report</span>
                </div>
            </div>
        </div>
    );
}

export default Login;
