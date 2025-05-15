import React, { useState } from "react";
import "../RegFormStyle.css";
import axios from "axios";

const RegForm = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleSwitch = () => {
    setIsLogin(!isLogin);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const url = isLogin 
        ? "https://localhost:7295/User/Authorize" 
        : "https://localhost:7295/User/Registrate";

      const response = await axios.post(url, formData);

      if (response.status === 200) {
        if (isLogin) {
          onLogin(); // Авторизация успешна
        } else {
          alert("Registration was successful! Now log in to your account.");
          setIsLogin(true); // Переключение на форму входа
        }
      }
    } catch (error) {
      if (!isLogin && error.response && error.response.status === 400) {
        alert("Error: User already exists!");
      } else {
        alert("Error connecting to server");
      }
    }
  };

  return (
    <div className="auth-container">
      <h2>{isLogin ? "Login" : "Sign up"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Enter username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">{isLogin ? "Login" : "Confirm"}</button>
      </form>
      <button className="switch-btn" onClick={handleSwitch}>
        {isLogin ? "Sign up" : "Login"}
      </button>
    </div>
  );
};

export default RegForm;
