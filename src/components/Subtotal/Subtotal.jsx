import React from 'react'
import "./Subtotal.css"
import { useStateValue } from '../../StateProvider';
import { getCartTotal } from '../../reducer';

function Subtotal() {
    const [{cart}, dispatch] = useStateValue();

    const f = Intl.NumberFormat("en-us");
    
    return (
        <div className='subtotal'>
            <p className='price__details' style={{padding: "20px"}}>PRICE DETAILS</p>
            <div className='details1 div_flex'>
                <p>Price ({cart.length} items)</p>
                <p>${f.format(getCartTotal(cart))}</p>
            </div>
            <div className='details2 div_flex'>
                <p>Delivery Charges</p>
                <p style={{color: "#388F3D"}}>Free</p>
            </div>
            <div className='div_flex'>
                <h2>Total Amount</h2>
                <p>${f.format(getCartTotal(cart))}</p>
            </div>
        </div>
    )
}

export default Subtotal
