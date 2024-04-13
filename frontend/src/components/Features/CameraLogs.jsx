import React, { useState, useEffect } from 'react';
import { IoCalendarClear, IoTime, IoAlertCircle } from "react-icons/io5";
import moment from "moment-timezone";

const hardcodedLogs = [
    { date: "2024-04-01", time: "12:00", type: 'Arson', reported: true },
    { date: "2024-04-02", time: "15:30", type: 'Robbery', reported: true },
    { date: "2024-04-03", time: "17:45", type: 'Vandalism', reported: true },
    // ...any other hardcoded logs
];

const CameraLogs = ({ newReports }) => {
    const [logs, setLogs] = useState(hardcodedLogs);

    useEffect(() => {
        if (newReports) {
            setLogs(prevLogs => [...prevLogs, ...newReports]);
        }
    }, [newReports]);

    return (
        <div className="h-full overflow-y-auto">
            {logs.map((log, index) => (
                <div key={index} className="p-4 border-b border-gray-300">
                    <div className="flex items-center mb-1">
                        <IoCalendarClear className="text-gray-600 mr-2" />
                        <span>{log.date}</span>
                    </div>
                    <div className="flex items-center mb-1">
                        <IoTime className="text-gray-600 mr-2" />
                        <span>{log.time}</span>
                    </div>
                    <div className="flex items-center">
                        <IoAlertCircle className={`mr-2 ${log.reported ? 'text-green-600' : 'text-gray-600'}`} />
                        <span className={`${log.reported ? 'text-green-600' : 'text-gray-600'}`}>{log.type}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CameraLogs;
