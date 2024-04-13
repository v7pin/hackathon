import React, { useState } from "react";
import bg from "../assets/Background.png";
import cctvimg from "../assets/cctv.png";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      className="flex min-h-screen items-center justify-center"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
      }}
    >
      <img
        src={cctvimg}
        alt="CCTV Camera"
        className="absolute left-0 top-0 w-64 animate-moveCCTV"
      />
      <div className="absolute top-0  right-0 mt-2 mr-4 text-xs">
        <select className="bg-transparent w-full backdrop-blur-2xl text-white rounded p-2 ">
          <option value="en" className="text-black">
            English (UK)
          </option>
        </select>
      </div>
      <div
        className="max-w-lg w-full p-16 flex flex-col gap-4 rounded-xl shadow-md relative"
        style={{
          borderTop: "2px solid #4881C8",
          borderLeft: "2px solid #4881C8",
          borderBottom: "6px solid #4881C8",
          borderRight: "2px solid #4881C8",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(2px)",
        }}
      >
        <h2 className="text-white text-xl font-medium mb-2">Login</h2>
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email Address"
            className="w-full p-2 bg-transparent text-white outline-none border-b-2 border-white"
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full p-2 bg-transparent text-white outline-none border-b-2 border-white"
            />
            <span
              className="absolute right-0 top-0 mt-3 mr-2 cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <HiEye size={20} color="white" /> : <HiEyeOff size={20} color="white" />}
            </span>
          </div>
        </div>
        <button className="mt-6 mb-2 w-full p-2 bg-gradient-to-r from-blue-700 to-sky-400 text-white rounded-lg shadow-sm hover:from-blue-600 hover:to-sky-500 duration-1000">
          Login
        </button>
        <div className="text-center text-white text-sm">
          Don't have an account yet? <Link to="/" className="text-blue-400 hover:underline">Sign up</Link>
        </div>
      </div>
      {/* <div className="absolute bottom-0 left-20 mb-20 ml-6">
        <h3 className="text-white font-yatra text-6xl p-6 ">
          सुरक्षा! सावधान! सबका ध्यान!
        </h3>
      </div> */}
       <div className="absolute bottom-0 w-72 right-0 mb-2 mr-4 ">
        <img src="reverselogo.png" alt="" />
      </div>
    </div>
  );
};

export default LoginPage;
