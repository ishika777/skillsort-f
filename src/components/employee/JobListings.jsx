import React from "react";
import { Briefcase, MapPin, Calendar, Building2, Bookmark, BookmarkMinus, DollarSign, Clock } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { saveJob, unsaveJob } from "@/actions/saveJob-action";
import ApplyJob from "./drawer/ApplyJob";
import FilterCard from "../shared/FilterCard";

const JobListings = ({ setSelectedJob, setTabValue, setPreviousTab }) => {
    const { allJobs, savedJobs } = useSelector((state) => state.job);
    const dispatch = useDispatch();

    const isJobSaved = (jobId) => {
        return savedJobs?.jobs?.some((saved) => saved?.job?._id === jobId || saved?.job === jobId);
    };

    const formatDate = (dateString) => {
        if (!dateString) return "Unknown date";
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    const saveJobHandler = async (job) => {
        const isSaved = isJobSaved(job?._id);
        try {
            isSaved ? await unsaveJob(dispatch, job?._id) : await saveJob(dispatch, job?._id);
        } catch (err) {
            console.log(err);
        }
    };

    const calculateDaysRemaining = (deadline) => {
        if (!deadline) return null;
        const today = new Date();
        const deadlineDate = new Date(deadline);
        const diffTime = deadlineDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays > 0 ? diffDays : 0;
    };

    return (
        <div className="tabs-scroll w-full p-6 overflow-y-auto h-full pt-4">
            {allJobs === null ? (
                <div className="flex flex-col items-center justify-center p-8 bg-white rounded-xl shadow">
                    <Briefcase size={48} className="text-gray-300 mb-4" />
                    <p className="text-gray-600 text-lg">No jobs found</p>
                    <p className="text-gray-400 mt-2">Try adjusting your filters or check back later</p>
                </div>
            ) : (
                <div className="flex gap-6 h-full">
                    <div className="flex-1">
                        <div className="grid gap-5">
                            {allJobs?.map((job) => {
                                const daysRemaining = calculateDaysRemaining(job?.deadline);
                                const isUrgent = daysRemaining !== null && daysRemaining <= 3;
                                
                                return (
                                    <div 
                                        key={job?._id} 
                                        className="bg-white p-6 border rounded-xl shadow-sm hover:shadow-md transition duration-300 relative overflow-hidden"
                                    >
                                        {isUrgent && (
                                            <div className="absolute top-0 right-0 bg-red-500 text-white px-3 py-1 text-xs font-bold">
                                                Closing Soon
                                            </div>
                                        )}
                                        
                                        <div className="flex items-start justify-between">
                                            <div 
                                                className="cursor-pointer group" 
                                                onClick={() => {
                                                    setSelectedJob(job);
                                                    setTabValue("jobdetails");
                                                    setPreviousTab("jobs");
                                                }}
                                            >
                                                <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors flex items-center gap-2">
                                                    <Briefcase className="text-blue-600 flex-shrink-0" size={20} />
                                                    {job?.title}
                                                </h3>
                                                
                                                {job?.company && (
                                                    <div className="text-sm text-gray-600 mt-1 flex items-center ml-7">
                                                        <Building2 size={16} className="mr-1 text-gray-400" />
                                                        {job?.company}
                                                    </div>
                                                )}
                                            </div>
                                            
                                            <button 
                                                className={`p-2 rounded-full ${isJobSaved(job?._id) ? 'bg-red-50 text-red-500' : 'bg-gray-50 text-gray-400 hover:bg-red-50 hover:text-red-500'} transition-colors`}
                                                onClick={() => saveJobHandler(job)}
                                                aria-label={isJobSaved(job?._id) ? "Unsave job" : "Save job"}
                                            >
                                                {isJobSaved(job?._id) ? <BookmarkMinus size={20} /> : <Bookmark size={20} />}
                                            </button>
                                        </div>
                                        
                                        <div className="flex flex-wrap gap-3 mt-4">
                                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                                job?.jobType === "Full-time" ? "bg-blue-100 text-blue-700" :
                                                job?.jobType === "Part-time" ? "bg-purple-100 text-purple-700" :
                                                job?.jobType === "Contract" ? "bg-orange-100 text-orange-700" :
                                                job?.jobType === "Internship" ? "bg-green-100 text-green-700" :
                                                "bg-gray-100 text-gray-700"
                                            }`}>
                                                {job?.jobType}
                                            </span>
                                            
                                            {job?.remoteType && (
                                                <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">
                                                    {job?.remoteType}
                                                </span>
                                            )}
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                            <div className="flex items-center gap-2 text-gray-700">
                                                <MapPin size={16} className="text-gray-500" />
                                                <span>{job?.location || "Location not specified"}</span>
                                            </div>
                                            
                                            <div className="flex items-center gap-2 text-gray-700">
                                                <DollarSign size={16} className="text-gray-500" />
                                                <span>{job?.salary || "Salary not specified"}</span>
                                            </div>
                                            
                                            <div className="flex items-center gap-2 text-gray-700">
                                                <Calendar size={16} className="text-gray-500" />
                                                <span>Deadline: {formatDate(job?.deadline)}</span>
                                            </div>
                                            
                                            <div className="flex items-center gap-2 text-gray-700">
                                                <Clock size={16} className="text-gray-500" />
                                                <span>Experience: {job?.experience} years</span>
                                            </div>
                                        </div>

                                        <div className="mt-5">
                                            <p className="text-sm font-medium text-gray-700 mb-2">Required Skills:</p>
                                            <div className="flex flex-wrap gap-2">
                                                {job?.skills?.map((skill, i) => (
                                                    <span key={i} className="bg-gray-100 text-gray-700 font-medium text-xs px-3 py-1 rounded-full">
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="mt-6 flex justify-between items-center">
                                            <div>
                                                {daysRemaining !== null && (
                                                    <span className={`text-sm font-medium ${
                                                        daysRemaining <= NULL ? "text-red-600" : 
                                                        daysRemaining <= 7 ? "text-orange-600" : 
                                                        "text-green-600"
                                                    }`}>
                                                        {daysRemaining} days remaining
                                                    </span>
                                                )}
                                            </div>
                                            <ApplyJob job={job} />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="w-72 sticky top-0 h-fit">
                        <FilterCard />
                    </div>
                </div>
            )}
        </div>
    );
};

export default JobListings;