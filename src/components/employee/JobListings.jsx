import React, { useState } from "react";
import { Briefcase, MapPin, Calendar, Building2, Bookmark, BadgeCheck, BookmarkMinus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { saveJob, unsaveJob } from "@/actions/saveJob-action";
import ApplyJob from "./drawer/ApplyJob";
import FilterCard from "../shared/FilterCard";

const JobListings = ({ setSelectedJob, setTabValue, setPreviousTab }) => {

    const { allJobs, savedJobs } = useSelector((state) => (state.job))
    const dispatch = useDispatch();

    const isJobSaved = (jobId) => {
        return savedJobs?.jobs?.some((saved) => saved?.job?._id === jobId || saved?.job === jobId);
    };

    const formatDate = (dateString) => {
        if (!dateString) return "Unknown date";
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const saveJobHandler = async (job) => {
        const isSaved = isJobSaved(job?._id);
        try {
            isSaved ? await unsaveJob(dispatch, job?._id) : await saveJob(dispatch, job?._id);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="tabs-scroll w-full p-6 overflow-y-auto h-[calc(100vh-64px)] pt-4">
            {allJobs?.length === 0 ? (
                <p>No jobs found.</p>
            ) : (
                <div className="flex gap-3 h-full">
                    <div className="flex flex-1 w-full">
                        <div className=" w-full grid gap-4">
                            {allJobs?.map((job) => (
                                <div key={job?._id} className="p-4 border rounded-xl shadow-sm hover:shadow-md transition">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center mb-4 gap-5">
                                            <div className="text-2xl hover:underline cursor-pointer font-medium flex items-center gap-2" onClick={() => {
                                                setSelectedJob(job);
                                                setTabValue("jobdetails");
                                                setPreviousTab("jobs")
                                            }}>
                                                <Briefcase className="text-blue-600" size={18} />
                                                {job?.title}
                                            </div>
                                            <div className="text-sm w-fit bg-green-100 text-green-700 px-3 py-1 rounded-full">
                                                {job?.jobType}
                                            </div>
                                        </div>
                                        <div className="text-red-500 hover:text-red-650 cursor-pointer" onClick={() => saveJobHandler(job)} >
                                            {isJobSaved(job?._id) ? <BookmarkMinus /> : <Bookmark />}
                                        </div>
                                    </div>

                                    <div className="text-sm text-gray-600 mt-1 flex flex-wrap gap-4">
                                        <span className="flex items-center gap-1">
                                            <MapPin size={16} /> {job?.location}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Calendar size={16} /> Deadline {formatDate(job?.deadline)}
                                        </span>
                                    </div>

                                    <div className="mt-2 text-sm font-semibold text-gray-800">
                                        Salary: {job?.salary}
                                    </div>

                                    <div className="mt-2 text-sm text-gray-700">
                                        Experience: {job?.experience} years
                                    </div>

                                    <div className="mt-3 mb-4 flex flex-wrap gap-2">
                                        {job?.skills?.map((skill, i) => (
                                            <span key={i} className="bg-blue-50 text-blue-800 font-semibold text-sm px-2 py-1 rounded-full">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>

                                    <ApplyJob job={job} />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="max-h-full min-w-[250px]">
                        <FilterCard />
                    </div>
                </div>
            )}
        </div>
    );
};

export default JobListings;
