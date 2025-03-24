// Pizzaslist.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../Components/Loading";
import Error from "../Components/Error";
import { deletePizza, getAllPizzas } from "../actions/pizzaActions";
import { Link } from "react-router-dom";

export default function Pizzaslist() {
  const dispatch = useDispatch();
  const pizzasstate = useSelector((state) => state.getAllPizzasReducer);

  const { pizzas, error, loading } = pizzasstate;
  useEffect(() => {
    dispatch(getAllPizzas());
  }, [dispatch]);

  return (
    <div className="adminlists">
      <h2>Pizzas list</h2>
      {loading && <Loading />}
      {error && <Error error="Something went wrong" />}

      <table className="table">
        <thead className="thead">
          <tr>
            <th>Name</th>
            <th>Prices</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
            {pizzas && pizzas.map((pizza) => {
                return <tr key={pizza._id}>
                    <td>{pizza.name}</td>
                    <td>
                        Small : {pizza.prices[0]['small']} <br />
                        Medium : {pizza.prices[0]['medium']} <br />
                        Large : {pizza.prices[0]['large']}
                    </td>
                    <td>{pizza.category}</td>
                    <td>
                    <i className="fa fa-trash m-2" onClick={()=>{dispatch(deletePizza(pizza._id))}}></i>
                    <Link to={`/admin/editpizza/${pizza._id}`}><i className="fa fa-edit m-2"></i></Link>
                    </td>
                </tr>
            })}
        </tbody>
      </table>
    </div>
  );
}
