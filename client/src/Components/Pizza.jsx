import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import { addToCart } from '../actions/cartActions';
import '../Components/Navbar'
export default function Pizza({ pizza }) {
    const [quantity, setQuantity] = useState(1);
    const [variant, setVariant] = useState('small');
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const dispatch = useDispatch();

    const addtocart = () => {
        dispatch(addToCart(pizza, quantity, variant));
    };

    return (
        <div className='container'>
           
            <div style={{ margin: '52px' }} className='shadow-lg p-3 mb-5  rounded'>
            <div className='main' onClick={handleShow}>
                <h1>{pizza.name}</h1>
                <img src={pizza.image} className='img-fluid' style={{ height: '200px', width: '200px', objectFit: 'contain' }} alt={pizza.name} />
            </div>

            <div className='flex-container'>
                <div className='w-100 m-1'>
                    <p>Variants</p>
                    <select className='form-control' value={variant} onChange={(e) => setVariant(e.target.value)}>
                        {pizza.variants.map((variant, index) => (
                            <option key={index} value={variant}>{variant}</option>
                        ))}
                    </select>
                </div>
                <div className='w-100 m-1'>
                    <p>Quantity</p>
                    <select className='form-control' value={quantity} onChange={(e) => setQuantity(e.target.value)}>
                        {[...Array(10).keys()].map((x, i) => (
                            <option key={i} value={i + 1}>{i + 1}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="flex-container">
                <div className='m-1 w-100'>
                    <h1 className='mt-2'>Price: {pizza.prices[0][variant] * quantity} Rs/-</h1>
                </div>
                <div className='m-1 w-100'>
                    <button className='btn' onClick={addtocart}>ADD TO CART</button>
                </div>
            </div>
            <Modal  show={show} onHide={handleClose}>
                <Modal.Header closeButton style={{backgroundColor:"#1c1c1c" ,color:"#e0e0e0"}}>
                    <Modal.Title style={{backgroundColor:"#1c1c1c" ,color:"#e0e0e0"}}>{pizza.name}</Modal.Title>
                </Modal.Header>

                <Modal.Body className="row justify-content-center" style={{backgroundColor:"#1c1c1c" ,color:"#e0e0e0"}}>
                    <img src={pizza.image} className='img-fluid' style={{ height: "400px" }} alt={pizza.name} />
                    <p>{pizza.description}</p>
                </Modal.Body>

                <Modal.Footer style={{backgroundColor:"#1c1c1c" ,color:"#e0e0e0"}}>
                    <button className='btn' onClick={handleClose}>Close</button>
                </Modal.Footer>
            </Modal>
        </div>
        </div>
    );
}
