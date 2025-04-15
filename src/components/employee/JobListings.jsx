import React, { useEffect, useState } from "react";
import { Briefcase, MapPin, Calendar, Building2 } from "lucide-react";

const JobListings = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    // Replace this dummy data with API call
    const fetchJobs = async () => {
      const data = [
        {
          id: 1,
          title: "Frontend Developer",
          company: "TechNova",
          location: "Remote",
          type: "Full-Time",
          postedDate: "2025-04-10",
          salary: "₹50,000 - ₹70,000",
        },
        {
          id: 2,
          title: "Backend Developer",
          company: "CloudStack",
          location: "Bangalore",
          type: "Part-Time",
          postedDate: "2025-04-08",
          salary: "₹30,000 - ₹50,000",
        },
      ];
      setJobs(data);
    };

    fetchJobs();
  }, []);

  return (
    <div className="tabs-scroll w-full p-6 overflow-y-auto h-[calc(100vh-64px)]">
      <h2 className="text-2xl font-semibold mb-4">Recent Jobs</h2>

      {jobs.length === 0 ? (
        <p>No jobs found.</p>
      ) : (
        <div className="grid gap-4">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="p-4 border rounded-xl shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium flex items-center gap-2">
                  <Briefcase className="text-blue-600" size={18} />
                  {job.title}
                </h3>
                <span className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full">
                  {job.type}
                </span>
              </div>
              <div className="text-sm text-gray-600 mt-1 flex flex-wrap gap-4">
                <span className="flex items-center gap-1">
                  <Building2 size={16} /> {job.company}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin size={16} /> {job.location}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar size={16} /> Posted on {job.postedDate}
                </span>
              </div>
              <div className="mt-2 text-sm font-semibold text-gray-800">
                Salary: {job.salary}
              </div>
              <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                Apply Now
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobListings;
