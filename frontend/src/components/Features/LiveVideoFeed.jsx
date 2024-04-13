import React, { useEffect, useRef, useState } from "react";
import { IoArrowBackCircle, IoNotifications, IoWarning } from "react-icons/io5";
import axios from "axios";
import moment from "moment-timezone";

const LiveVideoFeed = ({ setActiveComponent, reportLocation }) => {
    const videoRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const [recordingChunks, setRecordingChunks] = useState([]);
    const [notification, setNotification] = useState("");
    const [currentTime, setCurrentTime] = useState(moment().tz("Asia/Kolkata"));

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }

            mediaRecorderRef.current = new MediaRecorder(stream, { mimeType: "video/webm" });
            mediaRecorderRef.current.addEventListener("dataavailable", handleDataAvailable);
            mediaRecorderRef.current.start(30000); // Start recording, and generate a blob every 10000ms (10s)

            return () => {
                mediaRecorderRef.current.stop();
                stream.getTracks().forEach(track => track.stop());
            };
        }).catch(console.error);

        const intervalId = setInterval(() => {
            setCurrentTime(moment().tz("Asia/Kolkata"));
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const handleDataAvailable = (event) => {
        if (event.data.size > 0) {
            setRecordingChunks((prev) => [...prev, event.data]);
            sendVideoToServer(event.data);
        }
    };

    const sendVideoToServer = async (videoBlob) => {
        const formData = new FormData();
        formData.append("video", videoBlob);

        try {
            const response = await axios.post("http://localhost:5000/predict_video", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setNotification(`Prediction: ${response.data.most_common_prediction}`);
        } catch (error) {
            console.error(error);
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
      <button onClick={() => setActiveComponent("")} className="absolute top-5 left-5 text-lg font-semibold">
        <IoArrowBackCircle className="mr-2" /> Back
      </button>
      <h1 className="text-2xl font-semibold text-center">Live Video Feed</h1>
      <div className="flex justify-center">
        <video ref={videoRef} autoPlay playsInline className="w-3/4 md:w-1/2 lg:w-2/3 xl:w-1/2" style={{ maxHeight: "500px", maxWidth: "800px" }}></video>
      </div>
      {notification && (
        <div className="absolute bottom-5 left-[100px] right-0 flex justify-center">
          <div className="bg-yellow-300 px-12 py-4 rounded-lg flex items-center">
            <IoNotifications className="mr-2" />
            <span className="mr-4 text-lg font-bold">{notification}</span>
            <button onClick={handleReportClick} className="bg-red-500 flex hover:bg-red-700 text-white font-bold py-2 px-3 rounded">
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
