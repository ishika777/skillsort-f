import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Home,
    Briefcase,
    FileText,
    Bookmark,
    FilePlus,
    Settings,
    LogOut,
    Menu,
    X,
    ChevronLeft,
    Bell
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useSelector } from "react-redux";

import EmployeeDashHome from "./EmployeeDashHome";
import JobListings from "./JobListings";
import ApplicationsPage from "./ApplicationsPage";
import SavedJobs from "./SavedJobs";
import ResumeBuilder from "./ResumeBuilder";
import CoverLetter from "./CoverLetter";
import JobDetails from "./JobDetails";
import SettingsDetails from "../shared/Settings";


{/* <div className="p-6 flex items-center gap-2">
    <img src="/logo.png" alt="SkillSort" className="h-8 w-8" />
    <h1 className="font-bold text-xl">
        <span className="text-red-500">Skill</span>Sort
    </h1>
</div>
<div className="px-4 py-4 border-t border-b border-gray-800 mb-4">
    <div className="flex items-center gap-3">
        <Avatar className="h-10 w-10">
            <AvatarImage src={user.profilePicture} />
            <AvatarFallback className="bg-red-100 text-red-500">
                {getInitials(user.fullname)}
            </AvatarFallback>
        </Avatar>
        <div>
            <p className="font-medium">{user.fullname}</p>
            <p className="text-sm text-gray-400">Job Seeker</p>
        </div>
    </div>
</div>
*/}


const EmployeeLayout = () => {
    const [selectedJob, setSelectedJob] = useState(null);
    const [tabValue, setTabValue] = useState("dashboard");
    const [previousTab, setPreviousTab] = useState("jobs");

    const user = useSelector((state) => state.user?.user) || {
        fullname: "John Doe",
        profilePicture: null
    };

    const getInitials = (name) => {
        return name.split(' ').map(part => part[0]).join('').toUpperCase();
    };

    const menuItems = [
        { id: "dashboard", label: "Dashboard", icon: Home },
        { id: "jobs", label: "Job Listings", icon: Briefcase },
        { id: "applications", label: "My Applications", icon: FileText, badge: 3 },
        { id: "saved", label: "Saved Jobs", icon: Bookmark },
        { id: "resume", label: "Resume Builder", icon: FilePlus },
        { id: "coverletter", label: "CV Generator", icon: FileText },
        { id: "settings", label: "Settings", icon: Settings }
    ];

    return (
        <div className="h-full w-full bg-gray-50">
            <Tabs value={tabValue} onValueChange={(value) => { setTabValue(value) }} className="flex flex-row bg-gray-900 gap-0 h-full w-full">
                <div className="flex h-full">
                    <TabsList className="flex flex-col p-2 justify-start items-start min-w-[200px] w-fit h-fit bg-transparent">
                        {menuItems.map(item => (
                            <TabsTrigger key={item.id} value={item.id} className={`
                                           h-fit w-full mb-2 text-white rounded-lg
                                            ${tabValue === item.id
                                    ? 'bg-red-500 hover:bg-red-600 text-white'
                                    : 'hover:bg-gray-800 text-gray-300'}
                                        `}
                            >
                                <item.icon size={18} />
                                <span className="flex-1 text-left">{item.label}</span>
                                {item.badge && (
                                    <Badge className="ml-auto bg-white text-red-500 h-5">
                                        {item.badge}
                                    </Badge>
                                )}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </div>

                <div className="h-full flex flex-1 bg-white">
                    <TabsContent value="dashboard" className="h-full m-0 outline-none">
                        <EmployeeDashHome />
                    </TabsContent>
                    <TabsContent value="jobs" className="h-full m-0 outline-none">
                        <JobListings
                            setSelectedJob={setSelectedJob}
                            setTabValue={setTabValue}
                            setPreviousTab={setPreviousTab}
                        />
                    </TabsContent>
                    <TabsContent value="applications" className="h-full m-0 outline-none">
                        <ApplicationsPage
                            setSelectedJob={setSelectedJob}
                            setTabValue={setTabValue}
                            setPreviousTab={setPreviousTab}
                        />
                    </TabsContent>
                    <TabsContent value="saved" className="h-full m-0 outline-none">
                        <SavedJobs
                            setSelectedJob={setSelectedJob}
                            setTabValue={setTabValue}
                            setPreviousTab={setPreviousTab}
                        />
                    </TabsContent>
                    <TabsContent value="resume" className="h-full m-0 outline-none">
                        <ResumeBuilder />
                    </TabsContent>
                    <TabsContent value="settings" className="h-full m-0 outline-none">
                        <SettingsDetails />
                    </TabsContent>
                    <TabsContent value="coverletter" className="h-full m-0 outline-none">
                        <CoverLetter />
                    </TabsContent>
                    <TabsContent value="jobdetails" className="h-full m-0 outline-none">
                        <JobDetails
                            job={selectedJob}
                            setTabValue={setTabValue}
                            previousTab={previousTab}
                        />
                    </TabsContent>
                </div>
            </Tabs>





            {/* <main className="flex-1 overflow-auto bg-gray-50 ">
                    {tabValue === "jobdetails" && (
                        <div className="p-4 bg-white border-b ">
                            <Button
                                variant="ghost"
                                className="flex items-center gap-2 text-gray-600 hover:text-red-500"
                                onClick={() => setTabValue(previousTab)}
                            >
                                <ChevronLeft size={16} />
                                Back to {previousTab === "jobs" ? "Job Listings" :
                                    previousTab === "applications" ? "My Applications" :
                                        previousTab === "saved" ? "Saved Jobs" : "Dashboard"}
                            </Button>
                        </div>
                    )}
                </main> */}
        </div>

    );
};

export default EmployeeLayout;