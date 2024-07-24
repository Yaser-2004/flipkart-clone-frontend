import React, { useEffect, useState } from 'react';
import "./Header.css";
import { CiSearch } from "react-icons/ci";
import { LuUserCircle2 } from "react-icons/lu";
import { IoCartOutline } from "react-icons/io5";
import { MdKeyboardArrowDown } from "react-icons/md";
import { PiPackage, PiSignOut } from "react-icons/pi";
import { Link } from 'react-router-dom';
import { useStateValue } from '../../StateProvider';
import { useNavigate } from 'react-router-dom';
import axios from "axios"

function Header() {
    const url = process.env.REACT_APP_BASE_URL;
    const [{cart, user}, dispatch] = useStateValue();
    //const nameOfUser = user?.email.substring(0, user.email.indexOf('@'));
    const navigate = useNavigate();
    //console.log("hey user >>>", user);

    const [loginHover, setLoginHover] = useState(false);

    function handleHoverIn() {
        setLoginHover(true);
    }

    function handleHoverOut() {
        setLoginHover(false);
    }

    function signOut() {
        localStorage.clear();
        dispatch({
            type: 'SET_USER',
            user: null
        })
        dispatch({
            type: 'EMPTY_CART'
        })
        navigate("/")
    }

    async function getCartItems() {
        try {
            if (localStorage.length !== 0) {
                const {uid} = JSON.parse(localStorage.getItem('user'))
    
                dispatch({
                    type: 'EMPTY_CART'
                })
    
                await axios.post(`${url}/getcartitems`, {uid})
                    .then(result => {
                        //console.log(result.data.cart);
                        dispatch({
                            type: 'ADD_TO_CART',
                            cart: result.data.cart,
                        })
                    })
            }
        } catch (error) {
            console.log("Error getting cart items: ", error);
        }
        
    }

    useEffect(() => {

        async function userCart() {
            try {
                if (localStorage.length !== 0) {
                    const {uid} = JSON.parse(localStorage.getItem('user'))
    
                    await axios.post("https://flipkart-clone-server-ulo3.onrender.com/getcartitems", {uid})
                        .then(result => {
                            //console.log(result.data.cart);
                            dispatch({
                                type: 'EMPTY_CART'
                            })
    
                            dispatch({
                                type: 'ADD_TO_CART',
                                cart: result.data.cart,
                            })
                        })
                }
            } catch (error) {
                console.log(error);
            }
            
        }
        userCart();
    }, [])

    return (
        <div className='header'>
            <div className='header__items'>
                <Link to="/">
                    <img src="https://asset.brandfetch.io/idWdImNSUt/id8QxyjDqY.svg" alt="logo" className='logo' />
                </Link>
                <button className='search__button'><CiSearch /></button>
                <input type="text" className='search__input' placeholder='Search for Products, Brands and More' />
                <div className="options">
                    <Link to="/login">
                        <div className='login__div' onMouseOver={handleHoverIn} onMouseLeave={handleHoverOut} style={loginHover ? {backgroundColor: "#2A55E5", color: "white "} : null}>
                            <p><LuUserCircle2 /> {user ? user : "Login"} <MdKeyboardArrowDown id='down' style={loginHover && {transform: "rotate(180deg)", transition: "0.2s all ease-in-out"}} /></p>
                        </div>
                    </Link>

                    <div className='user__dropdown' style={loginHover ? null : {display: "none"}} onMouseOver={handleHoverIn} onMouseLeave={handleHoverOut}>
                        <div style={user ? {display: "none"} : null}>
                            <p>New User</p>
                            <Link to="/login"><p style={{color: "#2A55E5", fontWeight: 500}}>Sign Up</p></Link>
                        </div>
                        <Link to="/orders"><p><PiPackage /> Orders</p></Link>
                        <p className='sign__out' onClick={signOut}><PiSignOut /> Sign Out</p>
                    </div>

                    <div className='cart__div'>
                        <Link to="/checkout" onClick={getCartItems}>
                            <p><IoCartOutline />Cart</p>
                            <span className='cart__count' style={(cart?.length === 0) ? {display: "none"} : null}>{cart?.length}</span>
                        </Link>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default Header
