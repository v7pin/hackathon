import React from 'react';
import { IoArrowBackCircle } from 'react-icons/io5';

const CriminalProfiling = ({ setActiveComponent }) => {


  return (
    <div className="relative">
      <button 
        onClick={() => setActiveComponent("")} 
        className="absolute top-5 left-5 flex items-center text-lg font-semibold text-blue-700 hover:text-blue-900 bg-slate-200   hover:bg-blue-200 rounded-full shadow-md transition duration-300 ease-in-out p-2">
        <IoArrowBackCircle className="mr-2 text-1xl" /> 
        <span className="hidden sm:inline">Back</span> 
      </button>
      <h1 className="text-2xl font-semibold text-center">Criminal Profiling</h1>
    </div>
  );
};

export default CriminalProfiling;
