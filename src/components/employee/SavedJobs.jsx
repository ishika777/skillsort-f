import React, { useEffect, useState } from "react";
import { BookmarkMinus, MapPin, Calendar, Building2 } from "lucide-react";

const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState([]);

  useEffect(() => {
    // Replace with real API call to fetch saved jobs
    const fetchSavedJobs = async () => {
      const data = [
        {
          id: 1,
          title: "UI/UX Designer",
          company: "Designify",
          location: "Mumbai",
          type: "Remote",
          savedDate: "2025-04-10",
          salary: "₹40,000 - ₹60,000",
        },
        {
          id: 2,
          title: "DevOps Engineer",
          company: "InfraStack",
          location: "Delhi",
          type: "Full-Time",
          savedDate: "2025-04-09",
          salary: "₹60,000 - ₹90,000",
        },
      ];
      setSavedJobs(data);
    };

    fetchSavedJobs();
  }, []);

  const handleUnsave = (id) => {
    setSavedJobs((prev) => prev.filter((job) => job.id !== id));
    // Optionally, send a request to backend to remove saved job
  };

  return (
    <div className="tabs-scroll w-full p-6 overflow-y-auto h-[calc(100vh-64px)]">
      <h2 className="text-2xl font-semibold mb-4">Saved Jobs</h2>

      {savedJobs.length === 0 ? (
        <p className="text-gray-600">You haven’t saved any jobs yet.</p>
      ) : (
        <div className="grid gap-4">
          {savedJobs.map((job) => (
            <div
              key={job.id}
              className="p-4 border rounded-xl shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">{job.title}</h3>
                <button
                  className="text-red-600 hover:text-red-800"
                  onClick={() => handleUnsave(job.id)}
                  title="Remove from saved"
                >
                  <BookmarkMinus size={20} />
                </button>
              </div>
              <div className="text-sm text-gray-600 mt-1 flex flex-wrap gap-4">
                <span className="flex items-center gap-1">
                  <Building2 size={16} /> {job.company}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin size={16} /> {job.location}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar size={16} /> Saved on {job.savedDate}
                </span>
              </div>
              <div className="mt-2 text-sm font-semibold text-gray-800">
                Salary: {job.salary}
              </div>
              <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                View Job
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedJobs;
