import React, { useEffect, useState } from "react";
import { Briefcase, Calendar, MapPin } from "lucide-react";

const MyApplications = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    // Simulate API call
    const fetchApplications = async () => {
      // Replace this with actual API logic
      const data = [
        {
          id: 1,
          title: "Frontend Developer",
          company: "TechCorp",
          location: "Remote",
          appliedDate: "2025-04-10",
          status: "Under Review",
        },
        {
          id: 2,
          title: "Data Analyst",
          company: "DataSense",
          location: "Bangalore",
          appliedDate: "2025-04-01",
          status: "Interview Scheduled",
        },
      ];
      setApplications(data);
    };

    fetchApplications();
  }, []);

  return (
    <div className="tabs-scroll w-full p-6 overflow-y-auto h-[calc(100vh-64px)] pt-4">
      {applications.length === 0 ? (
        <p>No applications yet. Start applying!</p>
      ) : (
        <div className="grid gap-4">
          {applications.map((app) => (
            <div
              key={app.id}
              className="p-4 rounded-xl shadow border border-gray-200 hover:shadow-md transition"
            >
              <h3 className="text-lg font-medium flex items-center gap-2">
                <Briefcase className="text-blue-600" size={18} />
                {app.title}
              </h3>
              <p className="text-sm text-gray-500 mt-1">{app.company}</p>
              <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <MapPin size={16} /> {app.location}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar size={16} /> Applied on {app.appliedDate}
                </span>
              </div>
              <div className="mt-3">
                <span className="text-sm font-semibold text-green-600">
                  Status: {app.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyApplications;
