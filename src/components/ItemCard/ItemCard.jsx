import React, { useState } from 'react'
import "./ItemCard.css"
import { IoMdStar } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import { useStateValue } from '../../StateProvider';
import axios from "axios"

function ItemCard({id, title, price, description, category, image, rate}) {
    const [{cart}, dispatch] = useStateValue();
    const [mouseOver, setMouseOver] = useState(false);

    async function addToCart() {
        //dispatch the item into the data layer
        const url = process.env.REACT_APP_BASE_URL;
        try {
            dispatch({
                type: 'ADD_TO_CART',
                cart: [{
                    id: id,
                    title: title,
                    image: image,
                    price: price,
                    description: description,
                    rate: rate,
                }]
            })
    
            const {uid} = JSON.parse(localStorage.getItem('user'));
    
            await axios.post(`${url}/addtocart`, {id, title, price, description, category, image, rate, uid})
        } catch (error) {
            console.log(error);
        }


    }

    function handleOutline() {
        setMouseOver(true);
    }

    function handleNoOutline() {
        setMouseOver(false);
    }

    return (
        <div className='item__card' onMouseOver={handleOutline} onMouseLeave={handleNoOutline} style={mouseOver ? {border: "1px solid #2874F0"} : null}>
           <img src={image} alt="" className='item__image' /> 
           <p className='item__title'><strong>{title}</strong></p>
           <p className='item__description'>{description.slice(0, 100)}...</p>
           <div className='price__rating'>
                <p><small>$ </small><strong>{price}</strong></p>
                <p className='item__rate'>{rate}<IoMdStar /></p>
           </div>
           <button className='add_to_cart' onClick={addToCart}><IoCartOutline style={{marginRight: "10px", fontSize: "x-large"}} />ADD TO CART</button>
        </div>
    )
}

export default ItemCard
