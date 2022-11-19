import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../features/application/applicationSlice";

const Signup = () => {
  const dispatch = useDispatch();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const signUp = useSelector((state) => state.applicationSlice.signUp);
  const error = useSelector((state) => state.applicationSlice.error);

  function handleLogin(e) {
    setLogin(e.target.value);
  }

  function handlePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit() {
    dispatch(createUser({ login, password }));
  }

  return (
    <div className="main-signin">
      <div className="signin-box">
        <div className="error-signin">{error}</div>
        <div className="login">
          <input
            type="text"
            placeholder="Введите имя"
            value={login}
            onChange={handleLogin}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Введите пароль"
            value={password}
            onChange={handlePassword}
          />
        </div>
        <div className="login-btn">
          <button onClick={handleSubmit} disabled={signUp}>
            Зарегистрироваться
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
