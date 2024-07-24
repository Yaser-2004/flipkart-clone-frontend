import React from 'react'
import HorizontalItemCard from '../ItemCard/HorizontalCard'
import moment from "moment";
import "./Orders.css"


function Order({order}) {
    return (
        <div className='order'>
            <h2>Order</h2>
            <p>{moment.unix(order.created).format("MMMM Do YYYY, h:mma")}</p>
            <p className='order__id'>
                <small>{order.paymentIntentId}</small>
            </p>

            {order.items?.map(item => {
                return <HorizontalItemCard key={item.id} id={item.id} title={item.title} price={item.price} description={item.description} rate={item.rate} image={item.image} hideButton />
            })}

            <p className='order__total'>ORDER TOTAL: ${order.totalAmount / 100}</p>
        </div>
    )
}

export default Order
