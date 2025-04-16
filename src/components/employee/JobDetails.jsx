import React from "react";
import { ArrowLeft } from "lucide-react";

const JobDetails = ({ job, setTabValue }) => {
    if (!job) {
        return (
            <div className="p-6">
                <p>No job selected.</p>
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="mb-4 cursor-pointer" onClick={() => setTabValue("jobs")}>
                <ArrowLeft className="text-black" />
            </div>

            <h2 className="text-2xl font-bold mb-2">{job.title}</h2>

            <div className="text-gray-700 mb-2">
                <strong>Posted by:</strong> {job.recruiterId?.fullname}
            </div>

            <div className="text-gray-700 mb-2">
                <strong>Location:</strong> {job.location}
            </div>

            <div className="text-gray-700 mb-2">
                <strong>Job Type:</strong> {job.jobType}
            </div>

            <div className="text-gray-700 mb-2">
                <strong>Experience Required:</strong> {job.experience} years
            </div>

            <div className="text-gray-700 mb-2">
                <strong>Qualification:</strong> {job.qualification}
            </div>

            <div className="text-gray-700 mb-2">
                <strong>Salary:</strong> ₹{job.salary} per month
            </div>

            <div className="text-gray-700 mb-2">
                <strong>Application Deadline:</strong> {new Date(job.deadline).toLocaleDateString()}
            </div>

            <div className="text-gray-700 mb-2">
                <strong>Openings:</strong> {job.openings}
            </div>

            <div className="text-gray-700 mb-2">
                <strong>Skills Required:</strong>{" "}
                {job.skills.map((skill, idx) => (
                    <span
                        key={idx}
                        className="inline-block px-2 py-1 text-sm bg-blue-100 text-blue-700 rounded-full mr-2"
                    >
                        {skill}
                    </span>
                ))}
            </div>

            <div className="text-gray-700 mb-4">
                <strong>Description:</strong> {job.description}
            </div>

            <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                Apply Now
            </button>
        </div>
    );
};

export default JobDetails;
