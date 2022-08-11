import React, { useState } from "react";
import "./Auth.css";
import Logo from "../../img/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { logIn, signUp } from "../../actions/AuthAction";
const Auth = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.authReducer.loading);
  const [isSignup, setIsSignup] = useState(true);
  console.log(loading);
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    confirmpass: "",
  });

  const [confirmPass, setConfirmPass] = useState(true);

  const changeHandler = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (isSignup) {
      data.password === data.confirmpass
        ? dispatch(signUp(data))
        : setConfirmPass(false);
    } else {
      dispatch(logIn(data));
    }
  };

  const resetForm = () => {
    setConfirmPass(true);
    setData({
      firstname: "",
      lastname: "",
      username: "",
      password: "",
      confirmpass: "",
    });
  };
  return (
    <div className="Auth">
      {/* left side*/}
      <div className="a-left">
        <img src={Logo} alt="" />
        <div className="webName">
          <h1>Kingly App</h1>
          <h6>explore the world of fun</h6>
        </div>
      </div>

      {/* right side*/}
      <div className="a-right">
        <form className="infoForm authForm" onSubmit={submitHandler}>
          <h3>{isSignup ? "Sign up" : "Log In"}</h3>
          {isSignup && (
            <div>
              <input
                type="text"
                placeholder="First Name"
                className="infoInput"
                name="firstname"
                onChange={changeHandler}
                value={data.firstname}
              />

              <input
                type="text"
                placeholder="Last Name"
                className="infoInput"
                name="lastname"
                onChange={changeHandler}
                value={data.lastname}
              />
            </div>
          )}

          <div>
            <input
              type="text"
              placeholder="Username"
              className="infoInput"
              name="username"
              onChange={changeHandler}
              value={data.username}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              className="infoInput"
              name="password"
              onChange={changeHandler}
              value={data.password}
            />
            {isSignup && (
              <input
                type="password"
                placeholder="Comfirm Password"
                className="infoInput"
                name="confirmpass"
                onChange={changeHandler}
                value={data.confirmpass}
              />
            )}
          </div>
          <span
            style={{
              display: confirmPass ? "none" : "block",
              color: "red",
              fontSize: "12px",
              alignSelf: "flex-end",
              marginRight: "5px",
            }}
          >
            * Comfirm password does not match
          </span>
          <div>
            <span
              style={{ fontSize: "12px", cursor: "pointer" }}
              onClick={() => {
                setIsSignup((prev) => !prev);
                resetForm();
              }}
            >
              {isSignup
                ? "Already have an acount? Login"
                : "Dont have an account? Signup"}
            </span>
          </div>
          <button
            className="button info-button"
            type="submit"
            disabled={loading}
          >
            {loading ? "Loading..." : isSignup ? "signup" : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
