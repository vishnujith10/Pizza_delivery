import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, deleteFromCart } from '../actions/cartActions';
import Checkout from '../Components/Checkout';
export default function Cartscreen() {
  const cartstate = useSelector(state => state.cartReducer);
  const cartItems = cartstate.cartItems;
  const subtotal = cartItems.reduce((x, item) => x + item.price, 0);
  const dispatch = useDispatch();

  return (
    <div className="cart-screen-container">
      <div className="cart-row">
        <div className="cart-items-column">
          <h2 className="cart-header">My Cart ({cartItems.length})</h2>
          {cartItems.map(item => (
            <div className="cart-item" key={item._id}>
              <div className="cart-item-details">
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <div>
                  <h5 className="cart-item-name">{item.name}</h5>
                  <h6 className="cart-item-variant">{item.variants}</h6>
                  <div className="cart-quantity-controls">
                    <button
                      className=" cart-quantity-btn"
                      onClick={() => dispatch(addToCart(item, item.quantity - 1, item.variants))}
                    >
                      -
                    </button>
                    <b className="cart-quantity">{item.quantity}</b>
                    <button
                      className=" cart-quantity-btn"
                      onClick={() => dispatch(addToCart(item, item.quantity + 1, item.variants))}
                    >
                      +
                    </button>
                  </div>
                  <h5 className="cart-item-price">
                    ₹{item.price} <span className="cart-item-subprice">({item.quantity} x ₹{item.prices[0][item.variants]})</span>
                  </h5>
                </div>
              </div>
              <div>
                <button
                  className="cart-delete-btn"
                  onClick={() => dispatch(deleteFromCart(item))}
                >
                  <i className="fa fa-trash"></i>

                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="cart-summary-column">
          <h3 className="cart-total">Total Amount: ₹{subtotal}</h3>
          <Checkout subtotal = {subtotal}/>
        </div>
      </div>
    </div>
  );
}
