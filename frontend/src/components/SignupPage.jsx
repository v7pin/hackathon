import React, { useState } from "react";
import bg from "../assets/Background.png";
import cctvimg from "../assets/cctv.png";
import { SiGoogle, SiFacebook } from "react-icons/si";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { Link } from "react-router-dom";

const SignupPage = () => {
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
        className="signupform max-w-lg w-full p-16 flex flex-col gap-2 mt-1 rounded-xl shadow-md relative"
        style={{
          borderTop: "2px solid #4881C8",
          borderLeft: "2px solid #4881C8",
          borderBottom: "6px solid #4881C8",
          borderRight: "2px solid #4881C8",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(2px)",
        }}
      >
        <h2 className="text-white text-xl font-medium mb-2">Create Account</h2>
        <div className="flex justify-between mb-4">
          <button className="flex items-center justify-center px-4 py-2 text-xs border-2 border-blue-500 text-white rounded shadow-sm hover:bg-blue-600 duration-700">
            <SiGoogle className="mr-2" size={20} />
            Sign up with Google
          </button>
          <button className="flex items-center justify-center px-3 py-2 text-xs border-2 border-blue-500 text-white rounded shadow-sm hover:bg-blue-600 duration-700">
            <SiFacebook className="mr-2" size={20} />
            Sign up with Facebook
          </button>
        </div>
        <div className="text-center my-2 text-white">-OR-</div>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            className="w-full p-2 bg-transparent text-white outline-none border-b-2 border-white"
          />
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
              {showPassword ? (
                <HiEye size={20} color="white" />
              ) : (
                <HiEyeOff size={20} color="white" />
              )}
            </span>
          </div>
        </div>
        <div className="py-4 mt-4 flex flex-col gap-4">
          <Link
            to="/details"
            className="w-full p-2 text-center bg-gradient-to-r text-sm from-blue-700 to-sky-400 text-white rounded-lg shadow-sm hover:from-blue-600 hover:to-sky-500 duration-1000"
          >
            Register as Surveillance Partner
          </Link>
          <h6 className="text-center text-white text-xs">-OR-</h6>
          <Link
            to="/dashboard"
            className="w-full p-2 text-center bg-gradient-to-r text-sm from-blue-700 to-sky-400 text-white rounded-lg shadow-sm hover:from-blue-600 hover:to-sky-500 duration-1000"
          >
            Sign Up for Safety Alerts
          </Link>
        </div>
        <div className="text-center text-white text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-blue-400 hover:underline">
            Log in
          </a>
        </div>
      </div>
      <div className="absolute bottom-0 w-72 right-0 mb-2 mr-4 ">
        <img src="reverselogo.png" alt="" />
      </div>
    </div>
  );
};

export default SignupPage;
