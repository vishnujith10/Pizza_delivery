import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Loading from "../Components/Loading";
import Error from "../Components/Error";
import { getAllUsers } from '../actions/userActions';

export default function Userslist() {
  const dispatch = useDispatch();
  const usersstate = useSelector(state => state.getAllUsersReducer);
  const { loading, error ,users} = usersstate || {};
    useEffect(()=>{

      dispatch(getAllUsers());
      
    },[dispatch])
  
  return (
    <div className='adminlists'>
        <h1>Users list</h1>
        {loading && <Loading />}
      {error && <Error error="Something went wrong" />}
      <table className='table'>
        <thead className='thead'>
          <tr>
            <th>User id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {users && users.map(user=>{
            return <tr>
              <td>{user._id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td><i className="fa fa-trash"></i></td>
            </tr>
          })}
        </tbody>
      </table>
    </div>
  );
}
