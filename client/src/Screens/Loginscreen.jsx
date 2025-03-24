import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../actions/userActions";
import Error from "../Components/Error";
import Loading from "../Components/Loading";
export default function Loginscreen() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const loginstate = useSelector((state) => state.loginUserReducer);
  const { loading, error } = loginstate;
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("currentUser")) {
      window.location.href = "/";
    }
  });

  const loginState = useSelector((state) => state.loginUserReducer || {});

  function login() {
    const user = { email, password };
    dispatch(loginUser(user));
  }

  return (
    <div className="first">
      <div className="row-1 justify-content-center mt-7">
        <div className="col-md-5 text-start " style={{ marginBottom: "40px" }}>
          <h2
            className="text-center"
            style={{
              fontSize: "35px",
              marginBottom: "40px",
              marginTop: "50px",
            }}
          >
            Login
          </h2>
          {loading && <Loading />}
          {error && <Error error="invalid credentials" />}
          <div>
            {loading && <div>Loading...</div>}
            {error && <div className="alert alert-danger">Login failed</div>}
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
            <button onClick={login} className="btn mt-3">
              Login
            </button>
            <br />
            <br />
            <a style={{ fontSize: "15px" }} href="/register">
              Register here
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
