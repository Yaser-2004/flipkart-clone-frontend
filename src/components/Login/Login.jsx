import React, { useState } from 'react';
import "./Login.css";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import { useStateValue } from '../../StateProvider';

function Login() {
    const navigate = useNavigate();
    const url = process.env.REACT_APP_BASE_URL;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [{cart, user}, dispatch] = useStateValue();

    async function signIn(e) {
        e.preventDefault();

        try {
            await axios.post(`${url}/login`, {email, password})
                    .then(result => {
                        localStorage.setItem('user', JSON.stringify(result.data));
                        if (result.data.success === "success") {

                            dispatch({
                                type: 'SET_USER',
                                user: result.data.userName
                            })

                            dispatch({
                                type: 'ADD_TO_CART',
                                cart: result.data.cart
                            })

                            
                            navigate("/");
                        } else {
                            alert("Incorrect Password");
                        }
                    })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='login'>
            <div className='login__container'>
                <div className='login__left__div'>
                    <h2>Login</h2>
                    <p>Get access to your Orders, Wishlist and Recommendations</p>
                </div>

                <div className='login__right__div'>
                    <form action="">
                        <input type="text" placeholder='Email' name="email" value={email} onChange={e => setEmail(e.target.value)} />
                        <input type="password" placeholder='Password' name="password" value={password} onChange={e => setPassword(e.target.value)} />
                        <p style={{fontSize: "small", marginBottom: "-10px", color: "rgb(175, 175, 175)"}}>By continuing, you agree to Flipkart's <span style={{color: "#2A55E5"}}>Terms of Use</span> and <span style={{color: "#2A55E5"}}>Privacy Policy</span>.</p>
                        <button onClick={signIn} type='submit'>Login</button>
                    </form>

                    <div>
                        <Link to="/register"><p>New to Flipkart? Create Account</p></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
