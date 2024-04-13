import React, { useState } from 'react';
import { AiOutlineHome, AiOutlineMenu, AiOutlineClose, AiOutlineQuestionCircle } from 'react-icons/ai';
import { MdComputer, MdMovie, MdLiveTv, MdLocalOffer } from 'react-icons/md';
import { FaHotjar } from 'react-icons/fa';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`bg-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition duration-200 ease-in-out`}>
        {/* Close button */}
        <button onClick={toggleSidebar} className="text-gray-500 ml-auto block">
          <AiOutlineClose size={20} />
        </button>
        <nav>
          <a href="#" className="flex items-center space-x-2 px-4 py-3 rounded-md transition duration-150 hover:bg-red-500 hover:text-white">
            <AiOutlineHome size={20} />
            <span>Home</span>
          </a>
          {/* ... more links */}
          <a href="#" className="flex items-center space-x-2 px-4 py-3 rounded-md transition duration-150 hover:bg-red-500 hover:text-white">
            <MdComputer size={20} />
            <span>PC</span>
          </a>
          <a href="#" className="flex items-center space-x-2 px-4 py-3 rounded-md transition duration-150 hover:bg-red-500 hover:text-white">
            <MdMovie size={20} />
            <span>Movies</span>
          </a>
          {/* ... add other links with appropriate icons */}
        </nav>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex justify-between items-center p-4 bg-white shadow z-10">
          <button onClick={toggleSidebar} className="text-gray-500">
            <AiOutlineMenu size={24} />
          </button>
          {/* ... other header content */}
        </header>
        {/* Main content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
          <div className="container mx-auto px-6 py-8">
            <h3 className="text-gray-700 text-3xl font-medium">Dashboard</h3>
            {/* ... other main content */}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
