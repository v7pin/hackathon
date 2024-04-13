import React, { useState } from 'react';
import { FaPhone, FaTimes } from 'react-icons/fa'; // Import icons

const EmergencyHelplineComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Overlay background */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"></div>
      )}

      {/* Button to toggle the popup */}
      <button
        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold p-3 rounded-full flex items-center shadow-lg transition-transform transform ${
          isOpen ? 'rotate-45' : ''
        }`}
        onClick={togglePopup}
        style={{ transition: 'transform 0.2s' }}
      >
        <FaPhone className="text-2xl" />
      </button>

      {/* The popup itself */}
      {isOpen && (
        <div className="mt-2 p-5 bg-white rounded-lg shadow-xl absolute bottom-14 right-0 w-80 z-50 animate-bounceIn">
          <div className="flex justify-between items-center mb-4">
            <div className="font-bold text-xl text-blue-800">Emergency Helpline</div>
            <button onClick={togglePopup}>
              <FaTimes className="text-xl text-blue-800" />
            </button>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold">Police:</span>
              <span className="text-lg text-blue-600">100</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-semibold">Ambulance:</span>
              <span className="text-lg text-blue-600">102</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-semibold">Fire:</span>
              <span className="text-lg text-blue-600">101</span>
            </div>
            {/* Add more numbers as needed */}
          </div>
        </div>
      )}
    </div>
  );
};

export default EmergencyHelplineComponent;
