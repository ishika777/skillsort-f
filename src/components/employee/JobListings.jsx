import React, { useState } from "react";
import { Briefcase, MapPin, Calendar, Building2, Bookmark, BadgeCheck, BookmarkMinus } from "lucide-react";
import { useSelector } from "react-redux";
import { saveJob, unsaveJob } from "@/actions/saveJob-action";

const JobListings = ({ setSelectedJob, setTabValue }) => {

    const { allJobs } = useSelector((state) => (state.job))
    // const [icon, setIcon] = useState(<Bookmark />)
    const [save, setSave] = useState(false);

    const saveJobHandler = async (job) => {
        if (save) {
            try {
                const success = await unsaveJob(job._id);
                if (success) {
                    setSave((prev) => !prev);
                }
            } catch (err) {
                console.log(err);
            }
        } else {
            try {
                const success = await saveJob(job._id);
                if (success) {
                    setSave((prev) => !prev);
                }
            } catch (err) {
                console.log(err);
            }
        }
    }

    return (
        <div className="tabs-scroll w-full p-6 overflow-y-auto h-[calc(100vh-64px)]">
            <h2 className="text-2xl font-semibold mb-4">Recent Jobs</h2>

            {allJobs?.length === 0 ? (
                <p>No jobs found.</p>
            ) : (
                <div className="grid gap-4">
                    {allJobs?.map((job) => (
                        <div key={job._id} className="p-4 border rounded-xl shadow-sm hover:shadow-md transition">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center mb-4 gap-5">
                                    <div className="text-2xl hover:underline cursor-pointer font-medium flex items-center gap-2" onClick={() => {
                                        setSelectedJob(job);
                                        setTabValue("jobdetails");
                                    }}>
                                        <Briefcase className="text-blue-600" size={18} />
                                        {job.title}
                                    </div>
                                    <div className="text-sm w-fit bg-green-100 text-green-700 px-3 py-1 rounded-full">
                                        {job.jobType}
                                    </div>
                                </div>
                                <div className="text-red-500 hover:text-red-650 cursor-pointer" onClick={() => saveJobHandler(job)} >
                                    {save ? <BookmarkMinus /> : <Bookmark />}
                                </div>
                            </div>

                            <div className="text-sm text-gray-600 mt-1 flex flex-wrap gap-4">
                                <span className="flex items-center gap-1">
                                    <MapPin size={16} /> {job.location}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Calendar size={16} /> Deadline {job.deadline.split("T")[0] || "N/A"}
                                </span>
                            </div>

                            <div className="mt-2 text-sm font-semibold text-gray-800">
                                Salary: {job.salary}
                            </div>

                            <div className="mt-2 text-sm text-gray-700">
                                Experience: {job.experience} years
                            </div>

                            <div className="mt-3 flex flex-wrap gap-2">
                                {job.skills.map((skill, i) => (
                                    <span key={i} className="bg-blue-50 text-blue-800 font-semibold text-sm px-2 py-1 rounded-full">
                                        {skill}
                                    </span>
                                ))}
                            </div>

                            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
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
