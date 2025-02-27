import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Logging in with:", { email, password });
  };

  return (
    <div className="flex items-center lg:min-w-[86%] xl:min-w-[86%] w-full justify-center min-h-screen bg-gray-900 text-white px-6">
      <div className="w-full max-w-md bg-gray-800 bg-opacity-40 shadow-xl rounded-xl p-8 backdrop-blur-md">
        <h2 className="text-3xl font-semibold text-center mb-6">Welcome Back</h2>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="flex flex-col space-y-4">
          <div className="relative">
            <input
              type="email"
              required
              className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-400 focus:ring-2 focus:ring-blue-400 outline-none transition-all"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="relative">
            <input
              type="password"
              required
              className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-400 focus:ring-2 focus:ring-blue-400 outline-none transition-all"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-all"
          >
            Login
          </button>
        </form>

        {/* Forgot Password & Sign Up */}
        <div className="mt-6 text-center">
          <p className="text-gray-400 text-sm cursor-pointer hover:text-blue-400 transition-all">
            Forgot Password?
          </p>
          <p className="mt-3 text-gray-400 text-sm">
            New User?{" "}

            <NavLink to={"/sign-up"}>
            <span className="text-blue-400 cursor-pointer hover:underline">
              Sign Up
            </span>
            </NavLink>
           
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
