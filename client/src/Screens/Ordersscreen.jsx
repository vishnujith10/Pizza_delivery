import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrders } from "../actions/orderAction";
import pizzas from "../pizzasdata"; // Make sure to import the pizzas data

export default function Ordersscreen() {
  const dispatch = useDispatch();
  const orderstate = useSelector((state) => state.getUserOrdersReducer);
  const { orders, error, loading } = orderstate;

  useEffect(() => {
    dispatch(getUserOrders());
  }, [dispatch]);

  return (
    <div className="order-details-container">
      <h2 className="order-title">Order Details</h2>
      <hr />
      <div className="orders-list">
        {loading && <div className="loading">Loading...</div>}
        {error && <div className="error-message">Something went wrong</div>}
        {orders &&
          orders.map((order) => (
            <div key={order._id} className="order-card">
              <div className="order-section">
                <h3 className="section-title">Items</h3>
                <hr />
                {order.orderItems.map((item, index) => {
                  // Find the pizza image based on the item name
                  const pizza = pizzas.find((p) => p.name === item.name);
                  return (
                    <div key={index} className="item-details">
                      <div className="item-info">
                        <p>
                          {item.name} [{item.variants}] x {item.quantity} = ₹{item.price}
                        </p>
                      </div>
                      {pizza && (
                        <div className="item-image">
                          <img
                            src={pizza.image}
                            alt={item.name}
                            className="pizza-image"
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="order-section">
                <h3 className="section-title">Shipping Address</h3>
                <hr />
                <p>Street: {order.shippingAddress.street}</p>
                <p>City: {order.shippingAddress.city}</p>
                <p>Country: {order.shippingAddress.country}</p>
                <p>Pincode: {order.shippingAddress.pincode}</p>
              </div>
              <div className="order-section">
                <h3 className="section-title">Order Info</h3>
                <hr />
                <p>Order Amount: ₹{order.orderAmount}</p>
                <p>Date: {order.createdAt.substring(0, 10)}</p>
                <p>Transaction Id: {order.transactionId}</p>
                <p>Order Id: {order._id}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
