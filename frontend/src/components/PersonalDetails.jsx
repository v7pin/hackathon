import React, { useState } from "react";
import bg from "../assets/Background.png";
import cctvimg from "../assets/cctv.png"; // Import the CCTV image
import { Link } from "react-router-dom";

const PersonalDetails = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    adharNumber: "",
    address: "",
    locationOption: "manual", // Default to manual entry
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Implementation for form submission goes here
    // Redirect or show success message
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
      <div
        className="max-w-lg w-full p-10 flex gap-2 flex-col  rounded-xl shadow-md relative"
        style={{
          borderTop: "2px solid #4881C8",
          borderLeft: "2px solid #4881C8",
          borderBottom: "6px solid #4881C8",
          borderRight: "2px solid #4881C8",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(2px)",
        }}
      >
        <h2 className="text-2xl font-semibold text-center mb-8 text-white">Personal Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="firstName" className="block mb-1 text-white">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full p-2 bg-transparent text-white outline-none border-b-2 border-white"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="lastName" className="block mb-1 text-white">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full p-2 bg-transparent text-white outline-none border-b-2 border-white"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="adharNumber" className="block mb-1 text-white">Aadhar Card Number</label>
            <input
              type="text"
              id="adharNumber"
              name="adharNumber"
              value={formData.adharNumber}
              onChange={handleChange}
              className="w-full p-2 bg-transparent text-white outline-none border-b-2 border-white"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="locationOption" className="block mb-1 text-white">Choose Location Option</label>
            <select
              id="locationOption"
              name="locationOption"
              value={formData.locationOption}
              onChange={handleChange}
              className="bg-transparent w-full backdrop-blur-2xl text-white rounded p-2"
              style={{ backdropFilter: "blur(2xl)" }}
            >
              <option value="manual" className="text-black">Enter Manually</option>
              <option value="choose_location" className="text-black">Choose from Location</option>
            </select>
          </div>
          {formData.locationOption === "manual" && (
            <div className="mb-4">
              <label htmlFor="address" className="block mb-1 text-white">Camera Installation Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full p-2 bg-transparent text-white outline-none border-b-2 border-white"
                placeholder="Enter your address manually"
                required
              />
            </div>
          )}
          <Link
            to='/dashboard'
            type="submit"
            className="w-full text-center bg-gradient-to-r from-blue-700 to-sky-400 text-white rounded-md py-2 focus:outline-none hover:from-blue-600 hover:to-sky-500 duration-1000"
          >
            Submit
          </Link>
        </form>
        <div className="text-center mt-4">
          <Link to="/" className="text-blue-500 hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
      <div className="absolute bottom-0 w-72 right-0 mb-2 mr-4 ">
        <img src="reverselogo.png" alt="" />
      </div>
    </div>
  );
};

export default PersonalDetails;
