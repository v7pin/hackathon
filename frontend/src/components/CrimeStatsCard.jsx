import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faBalanceScaleLeft, faPhoneVolume, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';

const CrimeStatsCard = ({ title, count }) => {

  const mainIcon = {
    'Crimes Reported': faChartLine,
    'Actions Taken': faBalanceScaleLeft,
    'Cases on Hold': faPhoneVolume,
  }[title];

  
  const changes = {
    'Crimes Reported': -5.2, 
    'Actions Taken': 3.7,    
    'Cases on Hold': 1.1,    
  };
  
  const change = changes[title];
  const trendIcon = change >= 0 ? faArrowUp : faArrowDown;
  const trendColor = change >= 0 ? 'text-green-600' : 'text-red-600';

  return (
    <div className="bg-blue-100 shadow rounded-lg p-4 flex items-center space-x-4">
      <div className="p-2 rounded-full bg-blue-500 text-white">
        <FontAwesomeIcon icon={mainIcon} className="text-xl" />
      </div>
      <div className="flex-1">
        <p className="text-xl font-semibold text-blue-900">{title}</p>
        <p className="text-lg text-blue-700">{count}</p>
      </div>
      <div className={`flex items-center ${trendColor}`}>
        <FontAwesomeIcon icon={trendIcon} />
        <span className="ml-1 font-medium">{Math.abs(change)}%</span>
      </div>
    </div>
  );
};

export default CrimeStatsCard;
