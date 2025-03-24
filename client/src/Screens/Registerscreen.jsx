import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../actions/userActions';
import Error from '../Components/Error';
import Loading from '../Components/Loading';
import Success from '../Components/Success';

export default function Registerscreen() {
    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [cpassword, setcpassword] = useState('');
    const [error, setError] = useState('');

    const registerstate = useSelector(state => state.registerUserReducer);
    const { loading, success } = registerstate;

    const dispatch = useDispatch();

    function validateEmail(email) {
        const re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
        return re.test(email);
    }

    function register() {
        if (!name || !email || !password) {
            setError('fields cannot be empty');
        } else if (!validateEmail(email)) {
            setError('Please enter a valid email');
        } else if (password !== cpassword) {
            setError('Passwords do not match');
        } else {
            const user = { name, email, password };
            dispatch(registerUser(user));
            
            // setError(); // Clear any previous errors
        }
    }

    return (
        <div className="first">

            <div className="row-1 justify-content-center mt-5">
                <div className="col-md-5 text-start" style={{ marginBottom: '40px', marginTop:"50px" }}>
                    {loading && (<Loading />)}
                    {success && (<Success success='User Registered Successfully' />)}
                    {registerstate.error && (<Error error='Email already registered' />)}
                    <h2 className="text-center" style={{ fontSize: '35px', marginBottom: '40px' }}>
                        Register
                    </h2>
                    <div>
                        <input
                            required
                            type="text"
                            placeholder="Name"
                            className="form-control"
                            value={name}
                            onChange={(e) => setname(e.target.value)}
                        />
                        <input
                            required
                            type="text"
                            placeholder="Email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setemail(e.target.value)}
                        />
                        <input
                            required
                            type="password"
                            placeholder="Password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setpassword(e.target.value)}
                        />
                        <input
                            required
                            type="password"
                            placeholder="Confirm Password"
                            className="form-control"
                            value={cpassword}
                            onChange={(e) => setcpassword(e.target.value)}
                        />
                        {error && <span style={{ color: 'red' }}>{error}</span> } {/* Error span */}
                        <button onClick={register} className="btn mt-3">Register</button>
                        <br />
                        <br />
                        <a style={{ fontSize: '15px' }} href="/login">Click here to login</a>
                    </div>
                </div>
            </div>
        </div>
    );
}
