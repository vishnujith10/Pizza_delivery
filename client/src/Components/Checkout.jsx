import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import StripeCheckout from 'react-stripe-checkout'
import { placeOrder } from '../actions/orderAction'
import Error from '../Components/Error';
import Loading from '../Components/Loading';
import Success from '../Components/Success';
export default function Checkout({subtotal}) {

    const orderstate = useSelector((state)=> state.placeOrderReducer)
    const {loading, error , success}= orderstate
    const dispatch = useDispatch()
    function tokenHandler(token)
    {
        console.log(token);
        dispatch(placeOrder(token,subtotal))
        
    }
  return (
    <div>

      {loading && (<Loading/>)}
      {error && (<Error error='Something went wrong'/>)}
      {success && (<Success success='Your Order Placed Successfully'/>)}

        <StripeCheckout
        
            amount={subtotal*100}
            shippingAddress
            token={tokenHandler}
            stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}
            currency='INR'
            >
             
        <button className="cart-pay-btn">Pay Now</button>
        </StripeCheckout>
    </div>
  )
}
