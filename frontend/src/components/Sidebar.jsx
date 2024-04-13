import React from "react";
import { IoArrowForward, IoArrowBack } from "react-icons/io5";

import { BiSolidCctv } from "react-icons/bi";
import { VscFeedback } from "react-icons/vsc";
import { FaMapMarkedAlt } from "react-icons/fa";
import { FaPersonCircleExclamation } from "react-icons/fa6";
import { GiLaurelsTrophy } from "react-icons/gi";

const menuItems = [
  { icon: BiSolidCctv, name: "Live Video Feeds" },
  { icon: FaMapMarkedAlt, name: "Alert on Map" },
  { icon: FaPersonCircleExclamation, name: "Criminal Profiling" },
  { icon: GiLaurelsTrophy, name: "Honors and Awards" },
  { icon: VscFeedback, name: "Feedback and Support" },
];

const Sidebar = ({ isOpen, toggle, setActiveComponent, activeComponent }) => {
  return (
    <div
      className={`fixed inset-y-0 left-0 bg-[#071E3D] overflow-hidden transition-all duration-300 ease-in-out z-30 ${
        isOpen ? "w-64" : "w-24"
      }`}
    >
      <div className="flex flex-col justify-between h-full">
        <div className="py-4 flex flex-col items-center justify-center">
          <img
            src="logo.png"
            alt="Logo"
            className="duration-300 ease-in-out w-24 h-24"
          />
          {/* Conditionally render app name based on isOpen state */}
          {isOpen && (
            <h2 className="text-white mt-2 text-3xl font-yatra transition-opacity duration-1000 ease-linear">
              Garuda
            </h2>
          )}
        </div>
        <nav className="mt-6 mb-24">
          {menuItems.map((item, index) => (
            <div
              key={index}
              onClick={() => setActiveComponent(item.name)}
              className={`group flex items-center w-full text-white py-6 px-4 transition-all duration-300 ease-in-out hover:bg-[#01A9FF] hover:text-white cursor-pointer ${
                activeComponent === item.name ? "bg-[#01A9FF]" : ""
              }`}
              style={{
                position: "relative",
                paddingLeft: isOpen ? "3rem" : "1rem",
              }}
            >
              <item.icon
                className="text-3xl absolute"
                style={{
                  left: "2rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              />
              <span
                className={`text-sm transition-opacity duration-300 ease-in-out ${
                  isOpen ? "opacity-100" : "opacity-0"
                } pl-8`}
                style={{ whiteSpace: "nowrap" }}
              >
                {item.name}
              </span>
            </div>
          ))}
        </nav>
        <button
          onClick={toggle}
          className="mb-4 mr-2 self-end transform bg-white rounded-full p-1 flex items-center justify-center shadow-lg focus:outline-none"
        >
          {isOpen ? (
            <IoArrowBack className="text-black text-2xl" />
          ) : (
            <IoArrowForward className="text-black text-2xl" />
          )}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
