import React from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";
import ApplyJob from "./drawer/ApplyJob";

const JobDetails = ({ job, setTabValue, previousTab }) => {
    if (!job) {
        return (
            <div className="p-6">
                <p className="text-gray-500 text-center">No job selected.</p>
            </div>
        );
    }

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric"
        });
    };

    return (
        <div className="w-full p-6 overflow-y-auto h-[calc(100vh-64px)]">
            <div className="flex flex-col justify-between h-full">
                <div className="rounded-xl bg-white">
                    <div className="border-b border-gray3-100 pb-5 mb-3">
                        <div className="flex items-center gap-5">
                            <div
                                className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-1 rounded-lg cursor-pointer transition-colors duration-200"
                                onClick={() => setTabValue(previousTab)}
                            >
                                <ArrowLeft size={20} />
                            </div>
                            <h2 className="text-3xl font-bold text-gray-800 mb-3">{job.title}</h2>
                        </div>
                        <p className="text-gray-700 text-sm leading-relaxed">{job.description}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 gap-x-8 text-sm mb-4">
                        <div className="flex items-center">
                            <div className="w-5 h-5 mt-0.5 text-blue-500 mr-2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                    <circle cx="12" cy="10" r="3"></circle>
                                </svg>
                            </div>
                            <div>
                                <p className="font-semibold text-gray-800">Location</p>
                                <p className="text-gray-600">{job.location}</p>
                            </div>
                        </div>

                        <div className="flex items-center">
                            <div className="w-5 h-5 mt-0.5 text-blue-500 mr-2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                                </svg>
                            </div>
                            <div>
                                <p className="font-semibold text-gray-800">Job Type</p>
                                <p className="text-gray-600">{job.jobType}</p>
                            </div>
                        </div>

                        <div className="flex items-center">
                            <div className="w-5 h-5 mt-0.5 text-blue-500 mr-2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <polyline points="12 6 12 12 16 14"></polyline>
                                </svg>
                            </div>
                            <div>
                                <p className="font-semibold text-gray-800">Experience</p>
                                <p className="text-gray-600">{job.experience} years</p>
                            </div>
                        </div>

                        <div className="flex items-center">
                            <div className="w-5 h-5 mt-0.5 text-blue-500 mr-2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                                    <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"></path>
                                </svg>
                            </div>
                            <div>
                                <p className="font-semibold text-gray-800">Qualification</p>
                                <p className="text-gray-600">{job.qualification}</p>
                            </div>
                        </div>

                        <div className="flex items-center">
                            <div className="w-5 h-5 mt-0.5 text-blue-500 mr-2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="12" y1="1" x2="12" y2="23"></line>
                                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                                </svg>
                            </div>
                            <div>
                                <p className="font-semibold text-gray-800">Salary</p>
                                <p className="text-gray-600">₹{job.salary} /month</p>
                            </div>
                        </div>

                        <div className="flex items-center">
                            <div className="w-5 h-5 mt-0.5 text-red-500 mr-2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                    <line x1="16" y1="2" x2="16" y2="6"></line>
                                    <line x1="8" y1="2" x2="8" y2="6"></line>
                                    <line x1="3" y1="10" x2="21" y2="10"></line>
                                </svg>
                            </div>
                            <div>
                                <p className="font-semibold text-gray-800">Deadline</p>
                                <p className="py-1 rounded-md text-red-600 font-medium">{formatDate(job.deadline)}</p>
                            </div>
                        </div>

                        <div className="flex items-center">
                            <div className="w-5 h-5 mt-0.5 text-green-500 mr-2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="9" cy="7" r="4"></circle>
                                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                                </svg>
                            </div>
                            <div>
                                <p className="font-semibold text-gray-800">Openings</p>
                                <p className="py-1 rounded-md text-green-600 font-medium">{job.openings}</p>
                            </div>
                        </div>
                    </div>

                    <div className="mb-8">
                        <p className="font-semibold text-gray-800 mb-3 flex items-center text-lg">
                            <span className="w-6 h-6 mr-2 text-blue-500">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                </svg>
                            </span>
                            Skills Required
                        </p>
                        <div className="flex flex-wrap gap-2 ml-7">
                            {job.skills.map((skill, idx) => (
                                <span
                                    key={idx}
                                    className="bg-blue-50 text-blue-700 text-sm font-medium px-4 py-2 rounded-full border border-blue-100"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>

                </div>

                <ApplyJob />
            </div>

        </div>
    );
};

export default JobDetails;
