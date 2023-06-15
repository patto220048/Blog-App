import { Link } from "react-router-dom";
import styled from "./ResetPass.module.scss"

function ResetPass() {
    
    return ( 
        <div className={styled.reset}>
            <div className={styled.wapper}>
                <h1>Reset Password</h1>
                <form>
                    <input type="email" placeholder="Email" />
                    <span>errfa d a dfa df ad</span>

                    <button type="submit" className="none">
                        Send
                    </button>
                </form>
                <span>
                    <Link to="/signup">Sign up? </Link>
                    If you don't have account.{' '}
                </span>
                <div className={styled.formBot}>
                    <Link to="/">
                        <div>
                            <span>
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 40 34"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M40.0008 17.0008C40.0008 18.2811 39.0063 19.33 37.745 19.4227L37.5631 19.4294L8.16379 19.4288L17.9023 29.9236C18.8163 30.9085 18.7557 32.445 17.7671 33.3555C16.8306 34.2181 15.3971 34.2093 14.4717 33.3686L14.3223 33.2208L0.533204 18.3612C-0.178752 17.594 -0.178752 16.4076 0.533204 15.6404L14.3223 0.78078C15.2363 -0.204098 16.7786 -0.264399 17.7671 0.646095C18.7037 1.50867 18.8073 2.93309 18.0386 3.91805L17.9023 4.07797L8.16479 14.5718L37.5631 14.5722C38.9094 14.5722 40.0008 15.6595 40.0008 17.0008Z"
                                        fill="#333333"
                                    />
                                </svg>
                            </span>
                            <span>Back to home</span>
                        </div>
                    </Link>
                    <Link to = "/login" style={{textDecoration:"none"}}>
                        <span>Login </span>
                    </Link>
                </div>
            </div>
        </div>
     );
}

export default ResetPass;