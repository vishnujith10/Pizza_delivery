import React from 'react';
import Navbar from './Components/Navbar';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Homescreen from './Screens/Homescreen';
import CartScreen from './Screens/Cartscreen';
import Registerscreen from './Screens/Registerscreen';
import Loginscreen from './Screens/Loginscreen';
import Ordersscreen from './Screens/Ordersscreen';
import Adminscreen from './Screens/Adminscreen';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

function App() {
  const location = useLocation();
  const shouldShowNavbar = location.pathname !== '/login' && location.pathname !== '/register';

  return (
    <div className="App">
      {shouldShowNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Homescreen />} />
        <Route path="/cart" element={<CartScreen />} />
        <Route path="/register" element={<Registerscreen />} />
        <Route path="/login" element={<Loginscreen />} />
        <Route path="/orders" element={<Ordersscreen />} />
        <Route path="/admin/*" element={<Adminscreen />} />
      </Routes>
    </div>
  );
}

export default function RootApp() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
