import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Home, Briefcase, FileText, Bookmark, FilePlus, Settings } from "lucide-react";

import EmployeeDashHome from "./EmployeeDashHome";
import JobListings from "./JobListings";
import ApplicationsPage from "./ApplicationsPage";
import SavedJobs from "./SavedJobs";
import ResumeBuilder from "./ResumeBuilder";
import CoverLetter from "./CoverLetter";
import JobDetails from "./JobDetails";
import SettingsDetails from "../shared/Settings";

const EmployeeLayout = () => {
    const [selectedJob, setSelectedJob] = useState(null);
    const [tabValue, setTabValue] = useState("jobs");
    const [previousTab, setPreviousTab] = useState("jobs");
    return (
        <div className="h-full w-full">
            <Tabs value={tabValue} onValueChange={setTabValue} className="flex flex-row bg-gray-900 gap-0 h-full w-full">
                <div className="flex h-full">
                    <TabsList className="flex flex-col p-2 justify-start items-start bg-gray-900 rounded-none min-w-[200px] w-fit h-fit">
                        <TabsTrigger value="dashboard" className="hover:bg-gray-800 text-white mb-2 h-fit w-full">
                            <Home size={20} /> Dashboard
                        </TabsTrigger>
                        <TabsTrigger value="jobs" className="hover:bg-gray-800 text-white mb-2 h-fit w-full">
                            <Briefcase size={20} /> Job Listings
                        </TabsTrigger>
                        <TabsTrigger value="applications" className="hover:bg-gray-800 text-white mb-2 h-fit w-full">
                            <FileText size={20} /> My Applications
                        </TabsTrigger>
                        <TabsTrigger value="saved" className="hover:bg-gray-800 text-white mb-2 h-fit w-full">
                            <Bookmark size={20} /> Saved Jobs
                        </TabsTrigger>
                        <TabsTrigger value="resume" className="hover:bg-gray-800 text-white mb-2 h-fit w-full">
                            <FilePlus size={20} /> Resume Builder
                        </TabsTrigger>
                        <TabsTrigger value="coverletter" className="hover:bg-gray-800 text-white mb-2 h-fit w-full">
                            <FileText size={20} /> CV Generator
                        </TabsTrigger>
                        <TabsTrigger value="settings" className="hover:bg-gray-800 text-white mb-2 h-fit w-full">
                            <Settings size={20} /> Settings
                        </TabsTrigger>

                    </TabsList>
                </div>
                
                <div className="flex flex-1 bg-white">
                    <TabsContent value="dashboard"><EmployeeDashHome /></TabsContent>
                    <TabsContent value="jobs"><JobListings setSelectedJob={setSelectedJob} setTabValue={setTabValue} setPreviousTab={setPreviousTab} /></TabsContent>
                    <TabsContent value="applications"><ApplicationsPage setSelectedJob={setSelectedJob} setTabValue={setTabValue} setPreviousTab={setPreviousTab} /></TabsContent>
                    <TabsContent value="saved"><SavedJobs setSelectedJob={setSelectedJob} setTabValue={setTabValue} setPreviousTab={setPreviousTab} /></TabsContent>
                    <TabsContent value="resume"><ResumeBuilder /></TabsContent>
                    <TabsContent value="settings"><SettingsDetails /></TabsContent>
                    <TabsContent value="coverletter"><CoverLetter /></TabsContent>
                    <TabsContent value="jobdetails"><JobDetails job={selectedJob} setTabValue={setTabValue} previousTab={previousTab} /></TabsContent>
                </div>
            </Tabs>
        </div>
    );
};

export default EmployeeLayout;
