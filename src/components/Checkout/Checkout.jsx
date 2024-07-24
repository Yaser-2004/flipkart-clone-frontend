import React from 'react'
import "./Checkout.css"
import Subtotal from '../Subtotal/Subtotal'
import { useStateValue } from '../../StateProvider'
import HorizontalItemCard from '../ItemCard/HorizontalCard';
import { useNavigate } from 'react-router-dom';

function Checkout() {
    const [{cart}, dispatch] = useStateValue();
    const navigate = useNavigate();

    return (
        <div className='checkout'>
            <div className="cart__items">
                <h4>Your Items</h4>
                <div className='horizontal__item__cards'>
                        {cart.map(item => {
                            return <HorizontalItemCard id={item.id} title={item.title} description={item.description} rate={item.rate} price={item.price} image={item.image} />
                        })}
                </div>
                <div className='buy__button__div' style={cart?.length === 0 ? {display: "none"} : null}>
                    <button className='buy__button' onClick={e => navigate("/payment")}>PROCEED TO CHECKOUT</button>
                </div>
            </div>
            <div className="subtotal">
                <Subtotal />
            </div>
        </div>
    )
}

export default Checkout
