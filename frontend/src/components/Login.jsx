import React, { useState } from "react";
import { useDispatch } from "react-redux"; 
import { useNavigate, NavLink } from "react-router-dom"; 
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { login } from "../redux/authSlice"; // Import login action

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); 
  const dispatch = useDispatch(); // Initialize Redux dispatch

  const handleLogin = async (e) => {
    e.preventDefault();

    const payload = { email, password };

    try {
      const response = await axios.post("http://localhost:4000/user/login", payload, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (response.status === 200) {
        toast.success("Login Successful!");

        // Dispatch login action to update Redux state
        dispatch(login(response.data.user));

        setTimeout(() => {
          navigate("/");
        }, 2000); 
      } else {
        toast.error("Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.response?.data?.message || "Error logging in.");
    }
  };

  return (
    <div className="flex items-center lg:min-w-[86%] xl:min-w-[86%] w-full justify-center min-h-screen bg-gray-900 text-white px-6">
      <div className="w-full max-w-md bg-gray-800 bg-opacity-40 shadow-xl rounded-xl p-8 backdrop-blur-md">
        <h2 className="text-3xl font-semibold text-center mb-6">Welcome Back</h2>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="flex flex-col space-y-4">
          <input
            type="email"
            required
            className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-400 focus:ring-2 focus:ring-blue-400 outline-none transition-all"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            required
            className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-400 focus:ring-2 focus:ring-blue-400 outline-none transition-all"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="w-full py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-all">
            Login
          </button>
        </form>

        {/* Forgot Password & Sign Up */}
        <div className="mt-6 text-center">
          <p className="text-gray-400 text-sm cursor-pointer hover:text-blue-400 transition-all">Forgot Password?</p>
          <p className="mt-3 text-gray-400 text-sm">
            New User?{" "}
            <NavLink to={"/sign-up"}>
              <span className="text-blue-400 cursor-pointer hover:underline">Sign Up</span>
            </NavLink>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
