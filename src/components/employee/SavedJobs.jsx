import React from "react";
import { BookmarkMinus, MapPin, Calendar, Briefcase, Building2, Clock4 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { unsaveJob } from "@/actions/saveJob-action";
import ApplyJob from "./drawer/ApplyJob";

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

    return (
        <div className="tabs-scroll w-full p-6 overflow-y-auto h-[calc(100vh-64px)] pt-4">
            {savedJobs === null ? (
                <p className="text-gray-600">You haven’t saved any jobs yet.</p>
            ) : (
                <div className="grid gap-4">
                    {savedJobs?.jobs?.map((saved) => (
                        <div key={saved?.job?._id} className="p-4 border rounded-xl shadow-sm hover:shadow-md transition">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center mb-4 gap-5">
                                    <div
                                        className="text-2xl hover:underline cursor-pointer font-medium flex items-center gap-2"
                                        onClick={() => {
                                            setSelectedJob(saved?.job);
                                            setTabValue("jobdetails");
                                            setPreviousTab("saved");
                                        }}
                                    >
                                        <Briefcase className="text-blue-600" size={18} />
                                        {saved?.job?.title}
                                    </div>
                                    <div className="text-sm w-fit bg-green-100 text-green-700 px-3 py-1 rounded-full">
                                        {saved?.job?.jobType}
                                    </div>
                                </div>
                                <div
                                    className="text-red-500 hover:text-red-650 cursor-pointer"
                                    onClick={() => handleUnsave(saved?.job?._id)}
                                >
                                    <BookmarkMinus />
                                </div>
                            </div>

                            <div className="text-sm text-gray-500 mb-3 flex items-center gap-1">
                                <Clock4 size={14} />
                                Saved on: {formatDate(saved?.savedAt)}
                            </div>


                            <div className="text-sm text-gray-600 mt-1 flex flex-wrap gap-4">
                                <span className="flex items-center gap-1">
                                    <Building2 size={16} /> {saved?.job?.company}
                                </span>
                                <span className="flex items-center gap-1">
                                    <MapPin size={16} /> {saved?.job?.location}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Calendar size={16} /> Deadline {formatDate(saved?.job?.deadline)}
                                </span>
                            </div>

                            <div className="mt-2 text-sm font-semibold text-gray-800">
                                Salary: {saved?.job?.salary}
                            </div>

                            <div className="mt-2 text-sm text-gray-700">
                                Experience: {saved?.job?.experience} years
                            </div>

                            <div className="mt-3 mb-4 flex flex-wrap gap-2">
                                {saved?.job?.skills?.map((skill, i) => (
                                    <span key={i} className="bg-blue-50 text-blue-800 font-semibold text-sm px-2 py-1 rounded-full">
                                        {skill}
                                    </span>
                                ))}
                            </div>

                            <ApplyJob />
                        </div>
                    ))
                    }

                </div>
            )}
        </div>
    );
};

export default SavedJobs;
