import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useState } from 'react';
import { Home, FileText, Folder, Star, Settings } from "lucide-react";
import DashHome from "./DashHome";
import ResumeAnalysis from "./ResumeAnalysis";
import ShortlistedCandidates from "./ShortlistedCandidates";
import JobPostings from "./JobPostings";
import SettingsDetails from "../shared/Settings";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Layout = () => {
    const [tabValue, setTabValue] = useState("dashboard");

    const getInitials = (name) => {
        return name.split(" ").map(n => n[0]).join("").toUpperCase();
    };
    {/* <div className="flex flex-col h-full bg-gray-900 min-w-[220px] text-white">
                    <div className="p-6 flex items-center gap-2">
                        <img src="/logo.png" alt="SkillSort" className="h-8 w-8" />
                        <h1 className="font-bold text-xl">
                            <span className="text-red-500">Skill</span>Sort
                        </h1>

                    <div className="px-4 py-4 border-t border-b border-gray-800 mb-4">
                        <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                                <AvatarFallback className="bg-red-100 text-red-500">
                                    {getInitials(user.fullname)}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-medium">{user.fullname}</p>
                                <p className="text-sm text-gray-400">Recruiter</p>
                            </div>
                        </div>
                    </div> */}

    const menuItems = [
        { id: "dashboard", label: "Dashboard", icon: Home },
        { id: "job", label: "Job Postings", icon: FileText },
        { id: "resumeAnalysis", label: "Resume Analysis", icon: Folder },
        { id: "shortlistedCnadidates", label: "Shortlisted Candidates", icon: Star },
        { id: "settings", label: "Settings", icon: Settings },
    ];

    const user = {
        fullname: "Admin User",
        profilePicture: null,
    };

    return (
        <div className="h-full w-full bg-gray-50 dark:bg-gray-900">
            <Tabs value={tabValue} onValueChange={setTabValue} className="flex flex-row bg-gray-900 gap-0 h-full w-full">
            <div className="flex h-full">
                <TabsList className="flex flex-col p-2 justify-start items-start min-w-[200px] w-fit h-fit bg-transparent">
                    {menuItems.map(item => (
                        <TabsTrigger
                            key={item.id}
                            value={item.id}
                            className={`h-fit w-full mb-2 text-white rounded-lg
                                    ${tabValue === item.id
                                    ? 'bg-red-500 hover:bg-red-600 text-white'
                                    : 'hover:bg-gray-800 text-gray-300'
                                }`}
                        >
                            <item.icon size={18} />
                            {item.label}
                        </TabsTrigger>
                    ))}
                </TabsList>
                </div>

                <div className="flex-1 h-full bg-white">
                    <TabsContent value="dashboard" className="h-full m-0 outline-none">
                        <DashHome />
                    </TabsContent>
                    <TabsContent value="job" className="h-full m-0 outline-none">
                        <JobPostings />
                    </TabsContent>
                    <TabsContent value="resumeAnalysis" className="h-full m-0 outline-none">
                        <ResumeAnalysis />
                    </TabsContent>
                    <TabsContent value="shortlistedCnadidates" className="h-full m-0 outline-none">
                        <ShortlistedCandidates />
                    </TabsContent>
                    <TabsContent value="settings" className="h-full m-0 outline-none">
                        <SettingsDetails />
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    );
};

export default Layout;
