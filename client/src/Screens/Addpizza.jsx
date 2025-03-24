import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'; // Import Form and Button
import { addPizza } from '../actions/pizzaActions';
import { useDispatch, useSelector } from "react-redux";
import Loading from "../Components/Loading";
import Error from "../Components/Error";
import Success from "../Components/Success";


export default function Addpizza() {

  const[name, setname] = useState('');   
  const[smallprice, setsmallprice] = useState();   
  const[mediumprice, setmediumprice] = useState();   
  const[largeprice, setlargeprice] = useState();   
  const[image, setimage] = useState('');   
  const[description, setdescription] = useState('');   
  const[category, setcategory] = useState('');   
  const dispatch = useDispatch()

  const addpizzastate = useSelector((state) => state.addPizzaReducer);
  const {success , error , loading} = addpizzastate 

  function formHandler(e){
      e.preventDefault();

      const pizza ={
        name,
        image,
        description,
        category,
        prices:{
          small : smallprice,
          medium : mediumprice,
          large : largeprice,
        }
      }
      console.log(pizza);
      dispatch(addPizza(pizza));
      
  }

  return (
    <div className='adminlists'>
        
        <div className='text-start'>
          <h2>Add Pizza</h2>

          {loading && (<Loading/>)}
          {error && (<Error error='Something went wrong'/>)}
          {success && (<Success success='New Pizza Added'/>)}

          <form onSubmit={formHandler}>
            <input className='form-control' type="text" placeholder='Name' value={name} onChange={(e)=>{setname(e.target.value)}} />
            <input className='form-control' type="text" placeholder='small varient price' value={smallprice} onChange={(e)=>{setsmallprice(e.target.value)}} />
            <input className='form-control' type="text" placeholder='medium varient price' value={mediumprice} onChange={(e)=>{setmediumprice(e.target.value)}} />
            <input className='form-control' type="text" placeholder='large varient price' value={largeprice} onChange={(e)=>{setlargeprice(e.target.value)}} />
            <input className='form-control' type="text" placeholder='category' value={category} onChange={(e)=>{setcategory(e.target.value)}} />
            <input className='form-control' type="text" placeholder='description' value={description} onChange={(e)=>{setdescription(e.target.value)}} />
            <input className='form-control' type="text" placeholder='image' value={image} onChange={(e)=>{setimage(e.target.value)}} />
            <button className='btn mt-3' type='submit'>Add pizza</button>
          </form>
        </div>
    </div>
  )
}
