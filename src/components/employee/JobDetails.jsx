import React from "react";
import { ArrowLeft, MapPin, Briefcase, Clock, GraduationCap, DollarSign, Calendar, Users, CheckCircle } from "lucide-react";
import { Button } from "../ui/button";
import ApplyJob from "./drawer/ApplyJob";

const JobDetails = ({ job, setTabValue, previousTab }) => {
    if (!job) {
        return (
            <div className="flex items-center justify-center h-full bg-gray-50">
                <div className="text-center p-8 bg-white rounded-xl shadow-sm border border-gray-100">
                    <div className="text-gray-400 mb-4">
                        <Briefcase size={48} className="mx-auto opacity-50" />
                    </div>
                    <p className="text-gray-500 font-medium">No job selected</p>
                    <p className="text-gray-400 text-sm mt-2">Please select a job from the list to view details</p>
                    <Button 
                        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={() => setTabValue(previousTab)}
                    >
                        Back to Jobs
                    </Button>
                </div>
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

    // Calculate days remaining until deadline
    const calculateDaysRemaining = (deadlineDate) => {
        const today = new Date();
        const deadline = new Date(deadlineDate);
        const diffTime = deadline - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    const daysRemaining = calculateDaysRemaining(job.deadline);
    const isDeadlineSoon = daysRemaining <= 7 && daysRemaining > 0;
    const isDeadlinePassed = daysRemaining < 0;

    return (
        <div className="tabs-scroll w-full p-6 overflow-y-auto h-full pt-4">
            <div className="max-w-4xl mx-auto">
                {/* Header with back button */}
                <div className="flex items-center gap-3 mb-6">
                    <button
                        className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-2 rounded-full transition-colors duration-200"
                        onClick={() => setTabValue(previousTab)}
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <p className="text-sm text-gray-500">Back to jobs</p>
                </div>

                {/* Main Content */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    {/* Company Info & Apply Button */}
                    <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mr-4">
                                {job.company ? job.company.charAt(0) : "J"}
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800">{job.title}</h2>
                                <p className="text-gray-500 text-sm">{job.company || "Company name"}</p>
                            </div>
                        </div>
                        <div>
                            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6">
                                Apply Now
                            </Button>
                        </div>
                    </div>

                    {/* Job Description */}
                    <div className="p-6 border-b border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">Job Description</h3>
                        <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">{job.description}</p>
                    </div>

                    {/* Job Details */}
                    <div className="p-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Job Details</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="col-span-2 flex items-center justify-between p-4 rounded-lg bg-blue-50 border border-blue-100">
                                <div className="flex items-center">
                                    <Calendar className="w-5 h-5 text-blue-600 mr-3" />
                                    <div>
                                        <p className="font-medium text-gray-800">Application Deadline</p>
                                        <p className={`text-sm ${isDeadlinePassed ? 'text-red-600' : isDeadlineSoon ? 'text-orange-600' : 'text-blue-600'} font-medium`}>
                                            {formatDate(job.deadline)}
                                            {isDeadlinePassed ? ' (Closed)' : 
                                             isDeadlineSoon ? ` (${daysRemaining} days left)` : 
                                             ` (${daysRemaining} days remaining)`}
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-medium text-gray-800">Openings</p>
                                    <p className="text-green-600 font-medium">{job.openings} positions</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-3">
                                <MapPin className="w-5 h-5 mt-0.5 text-blue-600" />
                                <div>
                                    <p className="font-medium text-gray-800">Location</p>
                                    <p className="text-gray-600 text-sm">{job.location}</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-3">
                                <Briefcase className="w-5 h-5 mt-0.5 text-blue-600" />
                                <div>
                                    <p className="font-medium text-gray-800">Job Type</p>
                                    <p className="text-gray-600 text-sm">{job.jobType}</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-3">
                                <Clock className="w-5 h-5 mt-0.5 text-blue-600" />
                                <div>
                                    <p className="font-medium text-gray-800">Experience</p>
                                    <p className="text-gray-600 text-sm">{job.experience} years</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-3">
                                <GraduationCap className="w-5 h-5 mt-0.5 text-blue-600" />
                                <div>
                                    <p className="font-medium text-gray-800">Qualification</p>
                                    <p className="text-gray-600 text-sm">{job.qualification}</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-3">
                                <DollarSign className="w-5 h-5 mt-0.5 text-blue-600" />
                                <div>
                                    <p className="font-medium text-gray-800">Salary</p>
                                    <p className="text-gray-600 text-sm">₹{job.salary} /month</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Skills Required */}
                    <div className="p-6 border-t border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                            <CheckCircle className="w-5 h-5 mr-2 text-blue-600" />
                            Skills Required
                        </h3>
                        <div className="flex flex-wrap gap-2">
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

                    {/* Apply Button */}
                    <div className="p-6 border-t border-gray-100 bg-gray-50">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm text-gray-500">
                                    Posted on {job.postedDate ? formatDate(job.postedDate) : "Recently"}
                                </p>
                            </div>
                            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8">
                                Apply Now
                            </Button>
                        </div>
                    </div>
                </div>
                
                <ApplyJob />
            </div>
        </div>
    );
};

export default JobDetails;