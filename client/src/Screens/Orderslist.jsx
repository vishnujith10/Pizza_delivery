import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../Components/Loading";
import Error from "../Components/Error";
import { deliverOrder, getAllOrders } from "../actions/orderAction";

export default function Orderslist() {
  const dispatch = useDispatch();
  const getordersstate = useSelector((state) => state.getAllOrdersReducer);
  const { loading, error, orders } = getordersstate || {};

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]); // Add dispatch as a dependency

  return (
    <div>
      {loading && <Loading />}
      {error && <Error error="Something went wrong" />}
      <table className="table">
        <thead className="thead">
          <tr>
            <th>Order id</th>
            <th>Email</th>
            <th>User Id</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {orders &&
            orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.email}</td>
                <td>{order.userid}</td>
                <td>{order.orderAmount}</td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td>
                  {order.isDelivered ? (
                    <h1>Delivered</h1>
                  ) : (
                    <button
                      className="btn"
                      onClick={() => dispatch(deliverOrder(order._id))}
                    >
                      Deliver
                    </button>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
