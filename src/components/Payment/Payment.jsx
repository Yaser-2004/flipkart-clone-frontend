import React, { useEffect, useState } from 'react'
import "./Payment.css"
import { useStateValue } from '../../StateProvider'
import HorizontalItemCard from '../ItemCard/HorizontalCard';
import Subtotal from '../Subtotal/Subtotal';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { getCartTotal } from '../../reducer';
//import axios from '../../axios';
import { useNavigate } from 'react-router-dom';
import axios from "axios"

function Payment() {
    const navigate = useNavigate();
    const url = process.env.REACT_APP_BASE_URL;

    const [{cart, user}, dispatch] = useStateValue();

    const stripe = useStripe();
    const elements = useElements();

    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState();

    useEffect(() => {
        //generate the special stripe secret which allows us to charge a customer

        const getClientSecret = async () => {
            try {
                const response = await axios.post(`${url}/payment/create?total=${getCartTotal(cart)*100}`)

                setClientSecret(response.data.clientSecret);
            } catch (error) {
                console.log("error generating client Secret: ", error);
            }
        }

        getClientSecret();

    }, [cart]) //when ever the cart changes we have to generate a new client secret for a new payment

    function handleChange(event) {
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    }

    async function handleSubmit(event) {
        event.preventDefault()

    if (localStorage.length !== 0) {

        setProcessing(true);

        try {
            const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
            }).then(({ paymentIntent }) => {
                async function sendOrder() {
                    const {amount, status, id, created} = paymentIntent;
                    const {uid} = JSON.parse(localStorage.getItem('user'));
                    try {
                        await axios.post(`${url}/orderdone`, {amount, status, id, uid, cart, created})
                    } catch (error) {
                        console.log(error);
                    }
                }
                sendOrder();

                setSucceeded(true);
                setError(null);
                setProcessing(false);

                dispatch({
                    type:'EMPTY_CART'
                })

                navigate("/orders");

            })
        } catch(error) {
        console.log("error during payment", error);
        }

    } else {
        alert("Create an account or Login to continue");
    }
    }

    // async function handleSubmit(event) {
    //     //do all stripe stuffs
    //     event.preventDefault();
    //     setProcessing(true);

    //     const payload = await stripe.confirmCardPayment(clientSecret, {
    //         payment_method: {
    //             card: elements.getElement(CardElement)
    //         }
    //     }).then(({ paymentIntent }) => {
    //         //paymentIntent = payment confirmation

    //         db
    //           .collection('users')
    //           .doc(user?.uid)
    //           .collection('orders')
    //           .doc(paymentIntent.id)
    //           .set({
    //             cart: cart,
    //             amount: paymentIntent.amount,
    //             created: paymentIntent.created
    //           })

            // setSucceeded(true);
            // setError(null);
            // setProcessing(false);

            // dispatch({
            //     type: 'EMPTY_CART'
            // })

            // navigate("/orders");
    //     })

    //     //const payload = await stripe
    // }

    // function handleChange(event) {
    //     //Listen for changes in the CardElement and display any errors as the customer types their card details
    //     setDisabled(event.empty);
    //     setError(event.error ? event.error.message : "");
    // }

    return (
        <div className='payment'>
            <div className='left__payment__div'>
                <div className="delivery__address">
                    <div>1</div>
                    <div>
                        <p style={{fontWeight: "600", color: "grey", fontSize: "medium"}}>DELIVERY ADDRESS</p>
                        {/* email */}
                        <p>Street No. 123</p>
                        <p>Rohini, New Delhi</p>
                    </div>

                </div>

                <div className='order__details'>
                    <div className='order__details__heading'>
                        <div>2</div>
                        <div>
                            <p style={{fontWeight: "600", color: "grey", fontSize: "medium"}}>ORDER DETAILS</p>
                        </div>
                    </div>
                    {cart.map(item => {
                        return <HorizontalItemCard key={item.id} id={item.id} title={item.title} price={item.price} description={item.description} image={item.image} rate={item.rate} paymentTab={true} />
                    })}
                </div>

                <div className='payment__method'>
                    <div className='payment__method__heading'>
                        <div className='three'>3</div>
                        <div>
                            <p style={{fontWeight: "600", color: "grey", fontSize: "medium"}}>PAYMENT METHOD</p>
                            <div className="payment__details">
                                {/* stripe magic will go here */}

                                <form onSubmit={handleSubmit}>
                                    <CardElement onChange={handleChange} />

                                    <button className='payment__payButton' disabled={processing || disabled || succeeded}>
                                        <span>{processing ? <p>Processing</p> : `PAY $${getCartTotal(cart).toFixed(2)}`}</span>
                                    </button>

                                    {error && <div>{error}</div>}
                                </form>

                            </div>
                        </div>
                    </div>

                </div>

            </div>

            <div className='right__payment__div'>
                <Subtotal />
            </div>

        </div>
    )
}

export default Payment
