import React, { useEffect, useRef, useState } from "react";
import { IoArrowBackCircle, IoNotifications, IoWarning } from "react-icons/io5";
import axios from "axios";
import moment from "moment-timezone";

const LiveVideoFeed = ({ setActiveComponent, reportLocation }) => {
  const videoRef = useRef(null);
  const [notification, setNotification] = useState("");
  const [predictionInProgress, setPredictionInProgress] = useState(false);
  const [currentTime, setCurrentTime] = useState(moment().tz("Asia/Kolkata"));
  const [isProcessing, setIsProcessing] = useState(false);
  const [frameCount, setFrameCount] = useState(0);

  useEffect(() => {
    // Initialize video feed
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch(console.error);

    // Set up interval for frame capture and clock update
    const captureIntervalId = setInterval(() => {
      if (!isProcessing) {
        captureAndSendFrame();
      }
    }, 700); // Adjust time based on your requirements

    const clockIntervalId = setInterval(() => {
      setCurrentTime(moment().tz("Asia/Kolkata"));
    }, 1000);

    // Cleanup on component unmount
    return () => {
      clearInterval(captureIntervalId);
      clearInterval(clockIntervalId);
    };
  }, [isProcessing]);

  const captureAndSendFrame = () => {
    setIsProcessing(true);
    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext("2d");
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    canvas.toBlob((blob) => {
      sendFrameToServer(blob);
    }, "image/jpeg");
  };

  const sendFrameToServer = async (blob) => {
    setFrameCount((prevCount) => prevCount + 1); // Increment frame count
    console.log(`Sending frame ${frameCount}`);

    const formData = new FormData();
    formData.append("frame", blob);

    try {
      const response = await axios.post(
        "http://localhost:5000/predict",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      // Check if a prediction was made
      if (response.data.prediction) {
        console.log(
          `Prediction from frame ${frameCount}: ${response.data.prediction}`
        );
        setNotification(`Prediction: ${response.data.prediction}`);
      } else {
        // If we're collecting frames and haven't made a prediction yet
        console.log(
          `Frame ${frameCount} received by server, accumulating frames for prediction.`
        );
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsProcessing(false); // Ready to process the next frame
    }
  };

  const handleReportClick = () => {
    // Dummy location for demonstration purposes
    const dummyLocation = { coordinates: [78.9629, 20.5937] }; // Adjusted to match AlertsOnMap props
    reportLocation(dummyLocation);
  };

  return (
    <div className="">
      <div className="absolute top-16 right-5 text-sm bg-white p-2 rounded shadow">
        <div className="text-gray-600">
          <p>{currentTime.format("YYYY-MM-DD")}</p>
          <p>{currentTime.format("HH:mm:ss")}</p>
        </div>
      </div>
      <button
        onClick={() => setActiveComponent("")}
        className="absolute top-5 left-5 text-lg font-semibold"
      >
        <IoArrowBackCircle className="mr-2" /> Back
      </button>
      <h1 className="text-2xl font-semibold text-center">Live Video Feed</h1>
      <div className="flex justify-center">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="w-3/4 md:w-1/2 lg:w-2/3 xl:w-1/2"
          style={{ maxHeight: "500px", maxWidth: "800px" }}
        ></video>
      </div>
      {notification && (
        <div className="absolute bottom-5 left-[100px] right-0 flex justify-center">
          <div className="bg-yellow-300 px-12 py-4 rounded-lg flex items-center">
            <IoNotifications className="mr-2" />
            <span className="mr-4 text-lg font-bold">{notification}</span>
            <button
              onClick={handleReportClick}
              className="bg-red-500 flex hover:bg-red-700 text-white font-bold py-2 px-3 rounded"
            >
              <IoWarning className="mr-2" size={20} />
              Report
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveVideoFeed;
