import React from 'react'
import "./HorizontalCard.css"
import { IoMdStar } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import { useStateValue } from '../../StateProvider';
import axios from 'axios';

function HorizontalItemCard({id, title, price, description, category, image, rate, paymentTab, hideButton}) {
    const [{cart}, dispatch] = useStateValue();

    async function removeFromCart() {
        const url = process.env.REACT_APP_BASE_URL;

            dispatch({
                type: 'REMOVE_FROM_CART',
                id: id,
            })

            if (localStorage.length !== 0) {
                const {uid} = JSON.parse(localStorage.getItem('user'));
                console.log(id + "  " + uid);
                await axios.post(`${url}/removefromcart`, {id, uid})
            } 
                
    }

    return (

        <div className='hitem__card'>
            <div>
                <img src={image} alt="" className='hitem__image' /> 
            </div>

            <div>
                <p className='hitem__title'>{title}</p>
                <p className='hitem__description'>{description.slice(0, 60)}...</p>

                <div className='hprice__rating'>
                    <p><small>$ </small><strong>{price}</strong></p>
                    <p className='hitem__rate'>{rate}<IoMdStar style={{color: "#00C600"}} /></p>
                </div>
                {!hideButton && (<button className='remove_from_cart' onClick={removeFromCart}>{paymentTab ? 'REMOVE ITEM' : 'REMOVE FROM CART'}</button>)}
            </div>
           
        </div>
    )
}

export default HorizontalItemCard