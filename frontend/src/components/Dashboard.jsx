import React, { useState } from "react";
import Sidebar from "./Sidebar";
import DefaultContent from "./DefaultContent"; // Ensure correct path
import Topbar from "./Topbar"; 
import LiveVideoFeed from "./Features/LiveVideoFeed";
import AlertsOnMap from "./Features/AlertsOnMap";
import CriminalProfiling from "./Features/CriminalProfiling";
import HonorsAndAwards from "./Features/HonorsAndAwards";
import FeedbackAndSupport from "./Features/FeedbackAndSupport";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeComponent, setActiveComponent] = useState("");
  const [alertLocation, setAlertLocation] = useState(null);


  const handleReportLocation = (location) => {
    setAlertLocation(location);
    setActiveComponent("Alert on Map"); // Automatically navigate to Alert on Map component
  };

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case "Live Video Feeds":
        return <LiveVideoFeed setActiveComponent={setActiveComponent}  reportLocation={handleReportLocation}/>;
      case "Alert on Map":
        return <AlertsOnMap setActiveComponent={setActiveComponent} alertLocation={alertLocation} />;
      case "Criminal Profiling":
        return <CriminalProfiling setActiveComponent={setActiveComponent}/>;
      case "Honors and Awards":
        return <HonorsAndAwards setActiveComponent={setActiveComponent}/>;
      case "Feedback and Support":
        return <FeedbackAndSupport setActiveComponent={setActiveComponent}/>;
      default:
        return <DefaultContent />;
    }
  };


  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Topbar /> {/* Assuming this is your app's top bar */}
      <div className="flex flex-1">
        <Sidebar isOpen={isSidebarOpen} toggle={() => setIsSidebarOpen(!isSidebarOpen)} setActiveComponent={setActiveComponent} activeComponent={activeComponent} />
        <div className={`flex-1 transition-margin duration-300 ease-in-out ${isSidebarOpen ? "ml-64" : "ml-24"}`}>
          <main className="p-4">
            {renderActiveComponent()}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
