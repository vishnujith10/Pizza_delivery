// Adminscreen.js
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Routes, Link } from "react-router-dom";
import Userslist from "./Userslist";
import Orderslist from "./Orderslist";
import Addpizza from "./Addpizza";
import Pizzaslist from "./Pizzaslist";
import Editpizza from "./Editpizza";

export default function Adminscreen() {
  const userstate = useSelector((state) => state.loginUserReducer);
  const { currentUser } = userstate;

  useEffect(() => {
    if (!currentUser?.isAdmin) {
      window.location.href = "/";
    }
  }, [currentUser]);

  return (
    <div className="admin">
      <div className="row justify-content-center">
        <div className="col-md-10">
          <h2 style={{ fontSize: "35px" }}>Admin Panel</h2>
          <ul className="adminfunction">
            <li>
              <Link to="userslist">Users List</Link>
            </li>
            <li>
              <Link to="pizzaslist">Pizza List</Link>
            </li>
            <li>
              <Link to="addpizza">Add New Pizza</Link>
            </li>
            <li>
              <Link to="orderslist">Orders List</Link>
            </li>
          </ul>

          <Routes>
            <Route path="userslist" element={<Userslist />} />
            <Route path="orderslist" element={<Orderslist />} />
            <Route path="pizzaslist" element={<Pizzaslist />} />
            <Route path="addpizza" element={<Addpizza />} />
            <Route path="editpizza/:pizzaid" element={<Editpizza />} />
            <Route index element={<Userslist />} /> {/* Default route */}
          </Routes>
        </div>
      </div>
    </div>
  );
}
