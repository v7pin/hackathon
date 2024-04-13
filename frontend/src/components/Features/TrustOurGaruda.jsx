import React, { useState, useCallback } from 'react';
import { IoArrowBackCircle, IoCloudUploadOutline, IoSend } from 'react-icons/io5';
import { useDropzone } from 'react-dropzone';
import { ThreeDots } from 'react-loader-spinner';

const TrustOurGaruda = ({ setActiveComponent }) => {
  const [file, setFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const onDrop = useCallback(acceptedFiles => {
    setFile(acceptedFiles[0]);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      alert("Please select or drop a file before submitting.");
      return;
    }
    setIsAnalyzing(true);
    // Simulate the analysis delay for demonstration
    setTimeout(() => {
      alert("Analysis complete. Your video has been successfully analyzed.");
      setIsAnalyzing(false);
      setFile(null);
    }, 3000); // Adjust this delay as needed for your backend's response time
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-10">
      <div className="w-full max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <button 
          onClick={() => setActiveComponent("")} 
          className="absolute top-5 left-5 flex items-center text-lg font-semibold text-blue-700 hover:text-blue-800 transition duration-300 ease-in-out">
          <IoArrowBackCircle className="mr-2" size={24} />
          Back
        </button>
        <h1 className="text-3xl font-bold text-center mb-8">Trust Our Garuda</h1>
        <p className="text-center text-lg mb-6">Experience the power of Garuda's AI by testing it with your own video clips. Upload your file below, and let our system analyze and predict with accuracy.</p>
        
        <div {...getRootProps()} className="dropzone border-dashed border-4 border-gray-200 p-6 rounded-lg cursor-pointer hover:border-gray-300 transition-all ease-in-out flex flex-col items-center justify-center mb-4">
          <input {...getInputProps()} />
          <IoCloudUploadOutline size={48} className="text-blue-700" />
          {isDragActive ? 
            <p className="text-lg mt-2">Drop the files here ...</p> : 
            <p className="text-lg mt-2">Drag 'n' drop a video clip here, or click to select a file</p>
          }
        </div>
        {file && <p className="text-center mt-2">File ready to analyze: {file.name}</p>}
        
        <div className="flex justify-center">
          <button 
            onClick={handleSubmit} 
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300 ease-in-out flex items-center justify-center disabled:opacity-50" 
            disabled={isAnalyzing}>
            {isAnalyzing ? <ThreeDots color="#FFF" height={24} width={24} /> : <><IoSend className="mr-2" size={20} /> Analyze Video</>}
          </button>
        </div>
        {isAnalyzing && <p className="mt-4 text-center">Analyzing your video, please wait...</p>}
        
        {/* Educational Content */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-4">How It Works</h2>
          <p>Your uploaded video clip will go through our advanced AI analysis, which checks for various indicators of suspicious activity or behaviors. This process helps in demonstrating how Garuda can enhance safety and security in real-life scenarios.</p>
          <p className="mt-2">After the analysis, you'll receive insights into what was detected in your video, showcasing the accuracy and efficiency of our system.</p>
        </div>
      </div>
    </div>
  );
};

export default TrustOurGaruda;
