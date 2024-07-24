import React, { useEffect, useState } from 'react'
import "./Orders.css"
import { useStateValue } from '../../StateProvider';
import Order from './Order';
import axios from "axios"

function Orders() {

    const [{cart, user}, dispatch] = useStateValue();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const url = process.env.REACT_APP_BASE_URL;

        if (user) {
            const {uid} = JSON.parse(localStorage.getItem('user'))
            async function getOrders() {
                try {
                    const response = await axios.get(`${url}/orders/${uid}`)
                    setOrders(response.data);
                } catch (error) {
                    console.log(error);
                }

            }

            getOrders();
        }

    }, [user])

    return (
        <div className='orders'>
            <h1>Your Orders</h1>
            <div>
                {orders?.map(order => {
                    return <Order key={order._id} order={order} />
                })}
            </div>

        </div>
    )
}

export default Orders
