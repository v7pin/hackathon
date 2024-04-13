import React from "react";
import NatureOfReportChart from "./NatureOfReportChart";
import TopCitiesChart from "./TopCitiesChart";
import CrimesReportedChart from "./CrimesReportedChart"; 
import TopCrimesReportedChart from "./TopCrimesReportedChart"; 

const MyChartComponent = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="bg-white shadow-md rounded-lg p-4 m-4">
        <h2 className="text-lg font-semibold mb-4">Nature of Report</h2>
        <div className="flex justify-center items-center h-80">
          <NatureOfReportChart />
        </div>
      </div>
      <div className="bg-white shadow-md rounded-lg p-4 m-4">
        <h2 className="text-lg font-semibold mb-4">Top Cities</h2>
        <div className="flex justify-center items-center h-80">
          <TopCitiesChart />
        </div>
      </div>
      {/* Additional charts */}
      
      <div className="bg-white shadow-md rounded-lg p-4 m-4">
        <h2 className="text-lg font-semibold mb-4">Top 5 Crimes Reported</h2>
        <div className="flex justify-center items-center h-80">
          <TopCrimesReportedChart />
        </div>
      </div>
      <div className="bg-white shadow-md rounded-lg p-4 m-4">
        <h2 className="text-lg font-semibold mb-4">Crimes Reported</h2>
        <div className="flex justify-center items-center h-80">
          <CrimesReportedChart />
        </div>
      </div>
    </div>
  );
};

export default MyChartComponent;
