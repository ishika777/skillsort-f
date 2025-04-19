import React, { useState, useEffect } from "react";
import { Briefcase, Calendar, Star, Bell } from "lucide-react"; // Import lucide-react icons

const EmployeeDashboard = () => {
  // Sample data for dashboard (this would ideally come from an API)
  const [dashboardData, setDashboardData] = useState({
    upcomingInterviews: [
      { jobTitle: "Software Engineer", date: "2025-04-20", status: "Pending" },
      { jobTitle: "Data Analyst", date: "2025-04-25", status: "Confirmed" },
    ],
    recentApplications: [
      { jobTitle: "Frontend Developer", status: "Pending" },
      { jobTitle: "Backend Developer", status: "Shortlisted" },
    ],
    notifications: [
      { message: "Your application for Data Scientist has been shortlisted!", date: "2025-04-15" },
      { message: "Your resume has been updated successfully.", date: "2025-04-12" },
    ],
  });

  return (
    <div className="tabs-scroll w-full p-6 overflow-y-auto h-[calc(100vh-64px)] pt-4">

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {/* Upcoming Interviews */}
        <div className="card p-4 bg-white shadow-md rounded-md">
          <h2 className="text-xl font-medium">Upcoming Interviews</h2>
          {dashboardData.upcomingInterviews.map((interview, index) => (
            <div key={index} className="flex justify-between items-center mt-3">
              <div className="flex items-center">
                <Briefcase size={20} className="mr-2" />
                <span>{interview.jobTitle}</span>
              </div>
              <span>{interview.date}</span>
            </div>
          ))}
        </div>

        {/* Recent Job Applications */}
        <div className="card p-4 bg-white shadow-md rounded-md">
          <h2 className="text-xl font-medium">Recent Job Applications</h2>
          {dashboardData.recentApplications.map((application, index) => (
            <div key={index} className="flex justify-between items-center mt-3">
              <div className="flex items-center">
                <Calendar size={20} className="mr-2" />
                <span>{application.jobTitle}</span>
              </div>
              <span>{application.status}</span>
            </div>
          ))}
        </div>

        {/* Notifications */}
        <div className="card p-4 bg-white shadow-md rounded-md">
          <h2 className="text-xl font-medium">Recent Notifications</h2>
          {dashboardData.notifications.map((notification, index) => (
            <div key={index} className="flex justify-between items-center mt-3">
              <div className="flex items-center">
                <Bell size={20} className="mr-2" />
                <span>{notification.message}</span>
              </div>
              <span className="text-sm text-gray-500">{notification.date}</span>
            </div>
          ))}
        </div>
      </div>

      
    </div>
  );
};

export default EmployeeDashboard;
