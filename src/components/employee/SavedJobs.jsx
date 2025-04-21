import React from "react";
import { BookmarkMinus, MapPin, Calendar, Briefcase, Building2, Clock4, ExternalLink } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { unsaveJob } from "@/actions/saveJob-action";
import ApplyJob from "@/components/employee/drawer/ApplyJob";


const SavedJobs = ({ setSelectedJob, setTabValue, setPreviousTab }) => {
    const dispatch = useDispatch();
    const { savedJobs } = useSelector((state) => state.job);

    const handleUnsave = async (jobId) => {
        try {
            await unsaveJob(dispatch, jobId);
        } catch (err) {
            console.log(err);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    // Calculate days remaining until deadline
    const getDaysRemaining = (deadline) => {
        if (!deadline) return null;
        const today = new Date();
        const deadlineDate = new Date(deadline);
        const diffTime = deadlineDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    return (
        <div className="tabs-scroll w-full p-6 overflow-y-auto h-full pt-4">
            {!savedJobs?.jobs?.length ? (
                <div className="flex flex-col items-center justify-center py-16 bg-gray-50 rounded-xl">
                    <BookmarkMinus size={48} className="text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium text-gray-700 mb-2">No saved jobs found</h3>
                    <p className="text-gray-500 text-center max-w-md">
                        Jobs you save will appear here so you can come back to them later.
                    </p>
                    <button 
                        onClick={() => setTabValue("search")}
                        className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                    >
                        Browse Jobs
                    </button>
                </div>
            ) : (
                <div className="grid gap-6">
                    {savedJobs?.jobs?.map((saved) => {
                        const daysRemaining = getDaysRemaining(saved?.job?.deadline);
                        const isExpired = daysRemaining !== null && daysRemaining < 0;

                        return (
                            <div key={saved?.job?._id} className="bg-white border rounded-xl shadow-sm hover:shadow-md transition overflow-hidden">
                                {/* Job header section */}
                                <div className="p-5 border-b">
                                    <div className="flex justify-between items-start mb-3">
                                        <div 
                                            className="cursor-pointer group"
                                            onClick={() => {
                                                setSelectedJob(saved?.job);
                                                setTabValue("jobdetails");
                                                setPreviousTab("saved");
                                            }}
                                        >
                                            <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 flex items-center gap-2 transition-colors">
                                                {saved?.job?.title}
                                                <ExternalLink size={16} className="text-gray-400 group-hover:text-blue-600" />
                                            </h3>
                                            <div className="text-gray-600 mt-1 flex items-center gap-1">
                                                <Building2 size={14} /> 
                                                <span>{saved?.job?.company}</span>
                                            </div>
                                        </div>
                                        
                                        <button
                                            onClick={() => handleUnsave(saved?.job?._id)}
                                            className="text-gray-400 hover:text-red-500 p-1 rounded-full hover:bg-red-50 transition-all"
                                            title="Remove from saved jobs"
                                        >
                                            <BookmarkMinus size={20} />
                                        </button>
                                    </div>

                                    <div className="flex flex-wrap gap-2 items-center">
                                        <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                                            {saved?.job?.jobType}
                                        </span>
                                        
                                        {isExpired ? (
                                            <span className="bg-red-50 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
                                                Expired
                                            </span>
                                        ) : daysRemaining !== null && daysRemaining <= 3 ? (
                                            <span className="bg-amber-50 text-amber-700 px-3 py-1 rounded-full text-sm font-medium">
                                                Closing soon ({daysRemaining} days left)
                                            </span>
                                        ) : null}
                                    </div>
                                </div>
                                
                                {/* Job details section */}
                                <div className="p-5">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                        <div className="flex items-center gap-2">
                                            <MapPin size={16} className="text-gray-500" /> 
                                            <span className="text-gray-700">{saved?.job?.location}</span>
                                        </div>
                                        
                                        <div className="flex items-center gap-2">
                                            <Calendar size={16} className="text-gray-500" /> 
                                            <span className={`text-gray-700 ${isExpired ? 'line-through text-red-500' : ''}`}>
                                                Deadline: {formatDate(saved?.job?.deadline)}
                                            </span>
                                        </div>
                                        
                                        <div className="flex items-center gap-2">
                                            <Clock4 size={16} className="text-gray-500" /> 
                                            <span className="text-gray-700">
                                                Saved: {formatDate(saved?.savedAt)}
                                            </span>
                                        </div>
                                        
                                        <div className="flex items-center gap-2">
                                            <Briefcase size={16} className="text-gray-500" /> 
                                            <span className="text-gray-700">
                                                Experience: {saved?.job?.experience} years
                                            </span>
                                        </div>
                                    </div>
                                    
                                    <div className="mb-3">
                                        <div className="text-gray-900 font-medium">Salary</div>
                                        <div className="text-gray-700">{saved?.job?.salary}</div>
                                    </div>
                                    
                                    {saved?.job?.skills?.length > 0 && (
                                        <div className="mb-5">
                                            <div className="text-gray-900 font-medium mb-2">Skills</div>
                                            <div className="flex flex-wrap gap-2">
                                                {saved?.job?.skills?.map((skill, i) => (
                                                    <span key={i} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    
                                    <div className="flex justify-between items-center mt-4">
                                        <button 
                                            onClick={() => {
                                                setSelectedJob(saved?.job);
                                                setTabValue("jobdetails");
                                                setPreviousTab("saved");
                                            }}
                                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                        >
                                            View Details
                                        </button>
                                        
                                        <div className={`${isExpired ? 'opacity-50 pointer-events-none' : ''}`}>
                                            <ApplyJob job={saved?.job} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default SavedJobs;