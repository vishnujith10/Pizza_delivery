import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { editPizza, getPizzaById } from '../actions/pizzaActions';
import Loading from "../Components/Loading";
import Error from "../Components/Error";
import Success from "../Components/Success";

export default function Editpizza() {
  const { pizzaid } = useParams(); // Get pizzaid from route params
  const dispatch = useDispatch();
  const [name, setName] = useState('');   
  const [smallprice, setSmallPrice] = useState('');   // Changed to an empty string to ensure controlled state
  const [mediumprice, setMediumPrice] = useState(''); // Same here
  const [largeprice, setLargePrice] = useState('');   // And here
  const [image, setImage] = useState('');   
  const [description, setDescription] = useState('');   
  const [category, setCategory] = useState(''); 

  const getpizzabyidstate = useSelector((state) => state.getPizzaByIdReducer);
  const { pizza, loading, error } = getpizzabyidstate;

  const editpizzastate = useSelector((state) => state.editPizzaReducer);
  const { editsuccess } = editpizzastate || {};  // Provide fallback to an empty object

  useEffect(() => {
    if (pizzaid) {
      if (pizza && pizza._id === pizzaid) {
        // Populate the form fields if the pizza data is available
        setName(pizza.name);
        setSmallPrice(pizza.prices[0]['small'] || ''); // Fallback to empty string if undefined
        setMediumPrice(pizza.prices[0]['medium'] || '');
        setLargePrice(pizza.prices[0]['large'] || '');
        setImage(pizza.image);
        setDescription(pizza.description);
        setCategory(pizza.category);
      } else {
        // Fetch the pizza details if not already loaded
        dispatch(getPizzaById(pizzaid));
      }
    }
  }, [dispatch, pizzaid, pizza]);

  function formHandler(e) {
    e.preventDefault();
  
    const editedpizza = {
      _id: pizzaid,
      name,
      image,
      description,
      category,
      prices: {
        small: smallprice,
        medium: mediumprice,
        large: largeprice,
      }
    };
  
    console.log('Edited Pizza:', editedpizza); // Log the data for debugging
    
    // Dispatch the action to edit the pizza
    dispatch(editPizza(editedpizza));
  }
  

  return (
    <div className='adminlists'>
      <h2>Edit Pizza</h2>
      <h1>Pizza Id = {pizzaid}</h1> {/* Display the pizza ID */}
      <div className='text-start'>
        {loading && (<Loading />)}
        {error && (<Error error='Something went wrong' />)}
        {editsuccess && (<Success success='Pizza details edited successfully' />)}

        <form onSubmit={formHandler}>
          <input className='form-control' type="text" placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
          <input className='form-control' type="text" placeholder='small variant price' value={smallprice} onChange={(e) => setSmallPrice(e.target.value)} />
          <input className='form-control' type="text" placeholder='medium variant price' value={mediumprice} onChange={(e) => setMediumPrice(e.target.value)} />
          <input className='form-control' type="text" placeholder='large variant price' value={largeprice} onChange={(e) => setLargePrice(e.target.value)} />
          <input className='form-control' type="text" placeholder='category' value={category} onChange={(e) => setCategory(e.target.value)} />
          <input className='form-control' type="text" placeholder='description' value={description} onChange={(e) => setDescription(e.target.value)} />
          <input className='form-control' type="text" placeholder='image' value={image} onChange={(e) => setImage(e.target.value)} />
          <button className='btn mt-3' type='submit'>Confirm</button>
        </form>
      </div>
    </div>
  );
}
