import React, { useState } from "react";
import { useLanguage, useTheme } from "./App";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { language, translations } = useLanguage();
  const { darkMode, setDarkMode } = useTheme();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://nt-devconnector.onrender.com/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (data.token) {
        localStorage.setItem("token", data.token);
        navigate("/posts");
      } else {
        alert("Login failed!");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
      <form onSubmit={handleSubmit} className="p-6 bg-gray-200 rounded-md shadow-md">
        <h2 className="text-xl font-bold">{translations[language].signIn}</h2>
        <p>{translations[language].description}</p>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} className="w-full p-2 my-2 border rounded" required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} className="w-full p-2 my-2 border rounded" required />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded mt-2">Login</button>
        <button type="button" onClick={() => setDarkMode(!darkMode)} className="mt-2 text-sm underline">
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
