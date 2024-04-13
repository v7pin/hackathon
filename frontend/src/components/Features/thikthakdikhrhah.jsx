import React, { useEffect, useRef, useState } from "react";
import { IoArrowBackCircle, IoNotifications, IoWarning } from "react-icons/io5";
import axios from "axios";
import moment from "moment-timezone";

const LiveVideoFeed = ({ setActiveComponent, reportLocation }) => {
    const videoRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const [notification, setNotification] = useState("");
    const [isRecording, setIsRecording] = useState(false);
    const [currentTime, setCurrentTime] = useState(moment().tz("Asia/Kolkata"));

    useEffect(() => {
      navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
          if (videoRef.current) {
              videoRef.current.srcObject = stream;
          }

          // Check for the supported MIME type
          const options = { mimeType: 'video/webm; codecs=vp9' };
          if (!MediaRecorder.isTypeSupported(options.mimeType)) {
              console.warn(`${options.mimeType} is not supported, trying different codec.`);
              options.mimeType = 'video/webm; codecs=vp8';
              if (!MediaRecorder.isTypeSupported(options.mimeType)) {
                  console.warn(`${options.mimeType} is not supported either.`);
                  options.mimeType = ''; // Let the browser choose the codec
              }
          }

          mediaRecorderRef.current = new MediaRecorder(stream, options);
          mediaRecorderRef.current.ondataavailable = (event) => {
              if (event.data && event.data.size > 0) {
                  sendVideoToServer(event.data);
              }
          };

          const startRecording = () => {
              setIsRecording(true);
              mediaRecorderRef.current.start();
              setNotification("Recording...");
              
              setTimeout(() => {
                  mediaRecorderRef.current.stop();
                  setIsRecording(false);
                  setNotification("Processing...");
              }, 20000); // Stop recording after 20 seconds
          };

          // Start recording immediately and then every 30 seconds
          startRecording();
          const recordingInterval = setInterval(startRecording, 30000);

          return () => {
              clearInterval(recordingInterval);
              stream.getTracks().forEach((track) => track.stop());
          };
      });

      const clockInterval = setInterval(() => {
          setCurrentTime(moment().tz("Asia/Kolkata"));
      }, 1000);

      return () => clearInterval(clockInterval);
  }, []);

  const sendVideoToServer = async (videoBlob) => {
    const formData = new FormData();
    formData.append("video", videoBlob);

    try {
        const response = await axios.post("http://localhost:5000/classify-video", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        console.log("Prediction:", response.data);
        setNotification(`Prediction: ${response.data.predicted_category}`);
    } catch (error) {
        console.error("Error:", error);
    } finally {
        setNotification(""); // Clear notification
    }
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
                            onClick={() => reportLocation({ latitude: 78.9629, longitude: 20.5937 })}
                            className="bg-red-500 flex hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
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
