import React from "react";
import CrimeStatsCard from "./CrimeStatsCard"; // Ensure correct path
import RecentCrimeReports from "./RecentCrimeReports"; // Ensure correct path
import CrimeMap from "./CrimeMap"; // Ensure correct path
import EmergencyHelplineComponent from "./EmergencyHelplineComponent"; // Ensure correct path
import MyChartComponent from "./MyChartComponent"; 
import { FaRegListAlt, FaShieldAlt, FaPhone } from "react-icons/fa"; // Ensure correct path
const DefaultContent = () => {
  // Assuming stats and recentReports are props or static data
  const stats = [
    {
      title: "Crimes Reported",
      count: "120",
      icon: <FaRegListAlt className="text-xl" />,
    },
    {
      title: "Actions Taken",
      count: "95",
      icon: <FaShieldAlt className="text-xl" />,
    },
    {
      title: "Cases on Hold",
      count: "25",
      icon: <FaPhone className="text-xl" />,
    },
  ];

  const recentReports = [
    {
      date: "Mar 25, 2024",
      location: "Mumbai",
      description: "Theft in Andheri East",
    },
    // Add more reports as needed
  ];

  return (
    <div>
      <h1 className="text-3xl mb-6 font-medium font-belanosima text-sky-950">Garuda's Eye</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {stats.map((stat, index) => (
          <CrimeStatsCard
            key={index}
            title={stat.title}
            count={stat.count}
            icon={stat.icon}
          />
        ))}
      </div>
      <RecentCrimeReports reports={recentReports} />
      <CrimeMap />
      <EmergencyHelplineComponent />
      <MyChartComponent />
    </div>
  );
};

export default DefaultContent;
