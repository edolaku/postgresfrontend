import { useRef, useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth.js";
import useInput from "../hooks/useInput.js";
import useToggle from "../hooks/useToggle.js";
const LOGIN_URL = '/auth';


const Login = () => {
    const { setAuth } = useAuth();
    // console.log("setAuth dari Login.jsx: ", setAuth);


    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    // console.log("from dari Login.jsx: ", from);


    const userRef = useRef();
    const errRef = useRef();

    // digunakan agar inputan username dapat tetap terisi dari history
    const [username, usernameAttrib, resetUsername] = useInput('user', '') // useState('');

    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [check, toggleCheck] = useToggle('persist', false);


    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg('');
    }, [username, password]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(LOGIN_URL, JSON.stringify({ username, password }), {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            })
            // console.log("response dari Login.jsx: ", JSON.stringify(response.data));

            const accessToken = response?.data?.accessToken;
            // const role = response?.data?.role;
            // const bidang = response?.data?.bidang;
            setAuth({
                accessToken,
                // username,
                // role,
                // bidang,
            })

            resetUsername('');
            setPassword('');
            navigate(from, { replace: true });
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg(err.response?.data?.message);
            } else if (err.response?.status === 401) {
                setErrMsg(err.response?.data?.message);
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
        // console.log('username: ', username);
        // console.log('password: ', password);
    }

    // const togglePersist = () => {
    //     setPersist(prev => !prev);
    // }

    // useEffect(() => {
    //     localStorage.setItem("persist", persist);
    // }, [persist])

    return (
        <section>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
                {errMsg}
            </p>
            <h1>Sign In</h1>

            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    {...usernameAttrib}
                // required
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                // required 
                />

                <button>Sign In</button>

                {/* tombol tetap login */}
                <div className="persistCheck">
                    <input
                        type="checkbox"
                        id="persist"
                        onChange={toggleCheck}
                        checked={check}
                    />
                    <label htmlFor="persist">Trust this device</label>
                </div>

                <p>
                    Need an Account?<br />
                    <span className="line">
                        <a href="/register">Sign Up</a>
                    </span>
                    <br />
                    <span className="line">
                        <a href="/linkpage">Link Page</a>
                    </span>
                </p>
            </form>
        </section>
    )
}

export default Login