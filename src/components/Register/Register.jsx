import React, { useState } from 'react'
import "./Register.css"
import axios from "axios"
import { useNavigate } from 'react-router-dom';

function Register() {
    const navigate = useNavigate();
    const url = process.env.REACT_APP_BASE_URL;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    async function register(e) {
        e.preventDefault()

        try {
            await axios.post(`${url}/register`, {name, email, password});

            navigate("/login")
        } catch (error) {
            console.log("Error registering user: ", error);
        }
    }

    return (
        <div className='login__right__div register'>
            <form action="">
                <input type="text" placeholder='Your Name' value={name} onChange={e => setName(e.target.value)}  />
                <input type="text" placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} />
                <input type="password" placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} />
                <button type='submit' onClick={register}>Create Account</button>
            </form>
        </div>
    )
}

export default Register
