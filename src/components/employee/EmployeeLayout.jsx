import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Home,
    Briefcase,
    FileText,
    Bookmark,
    FilePlus,
    GraduationCap,
    Bell,
    Settings,
} from "lucide-react";

import EmployeeDashHome from "./EmployeeDashHome";
import JobListings from "./JobListings";
import MyApplications from "./MyApplications";
import SavedJobs from "./SavedJobs";
import ResumeBuilder from "./ResumeBuilder";
import SkillDevelopment from "./SkillDevelopment";
import EmployeeSettings from "./EmployeeSettings";
import CoverLetter from "./CoverLetter";

const EmployeeLayout = () => {
    return (
        <div className="h-full w-full">
            <Tabs defaultValue="dashboard" className="flex flex-row bg-gray-900 gap-0 h-full w-full">
                <div className="flex h-full">
                    <TabsList className="flex flex-col p-2 justify-start items-start bg-gray-900 rounded-none min-w-[200px] w-fit h-fit">
                        <TabsTrigger
                            value="dashboard"
                            className="hover:bg-gray-800 text-white mb-2 h-fit w-full"
                        >
                            <Home size={20} /> Dashboard
                        </TabsTrigger>
                        <TabsTrigger
                            value="jobs"
                            className="hover:bg-gray-800 text-white mb-2 h-fit w-full"
                        >
                            <Briefcase size={20} /> Job Listings
                        </TabsTrigger>
                        <TabsTrigger
                            value="applications"
                            className="hover:bg-gray-800 text-white mb-2 h-fit w-full"
                        >
                            <FileText size={20} /> My Applications
                        </TabsTrigger>
                        <TabsTrigger
                            value="saved"
                            className="hover:bg-gray-800 text-white mb-2 h-fit w-full"
                        >
                            <Bookmark size={20} /> Saved Jobs
                        </TabsTrigger>
                        <TabsTrigger
                            value="resume"
                            className="hover:bg-gray-800 text-white mb-2 h-fit w-full"
                        >
                            <FilePlus size={20} /> Resume Builder
                        </TabsTrigger>
                        <TabsTrigger
                            value="coverletter"
                            className="hover:bg-gray-800 text-white mb-2 h-fit w-full"
                        >
                            <FileText size={20} /> Cover Letter
                        </TabsTrigger>
                        <TabsTrigger
                            value="skills"
                            className="hover:bg-gray-800 text-white mb-2 h-fit w-full"
                        >
                            <GraduationCap size={20} /> Skill Development
                        </TabsTrigger>
                        <TabsTrigger
                            value="settings"
                            className="hover:bg-gray-800 text-white mb-2 h-fit w-full"
                        >
                            <Settings size={20} /> Settings
                        </TabsTrigger>
                        
                    </TabsList>
                </div>

                <div className="flex flex-1 bg-white">
                    <TabsContent value="dashboard"><EmployeeDashHome /></TabsContent>
                    <TabsContent value="jobs"><JobListings /></TabsContent>
                    <TabsContent value="applications"><MyApplications /></TabsContent>
                    <TabsContent value="saved"><SavedJobs /></TabsContent>
                    <TabsContent value="resume"><ResumeBuilder /></TabsContent>
                    <TabsContent value="skills"><SkillDevelopment /></TabsContent>
                    <TabsContent value="settings"><EmployeeSettings /></TabsContent>
                    <TabsContent value="coverletter"><CoverLetter /></TabsContent>
                </div>
            </Tabs>
        </div>
    );
};

export default EmployeeLayout;
