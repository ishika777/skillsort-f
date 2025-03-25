import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import React from 'react'
import { Home, FileText, Folder, Star, Settings } from "lucide-react";
import Dashboard from "./Dashboard";
import ResumeAnalysis from "./ResumeAnalysis";
import ShortlistedCandidates from "./ShortlistedCandidates";
import JobPostings from "./JobPostings";
import RecruiterSettings from "./RecruiterSettings";


const Layout = () => {
    return (
        <div className="h-full w-full">
            <Tabs defaultValue="dashboard" className="flex flex-row bg-gray-900 gap-0 h-full w-full">
                <div className="flex h-full">
                    <TabsList className="flex flex-col p-2 justify-start items-start bg-gray-900 rounded-none min-w-[200px] w-fit h-fit">
                        <TabsTrigger value="dashboard" className="hover:bg-gray-800 text-white mb-2 h-fit w-full">
                            <Home size={20} /> Dashboard
                        </TabsTrigger>
                        <TabsTrigger value="job" className="hover:bg-gray-800 text-white  mb-2 h-fit w-full">
                            <FileText size={20} /> Job Postings
                        </TabsTrigger>
                        <TabsTrigger value="resumeAnalysis" className="hover:bg-gray-800 text-white  mb-2 h-fit w-full">
                            <Folder size={20} /> Resume Analysis

                        </TabsTrigger>
                        <TabsTrigger value="shortlistedCnadidates" className="hover:bg-gray-800 text-white  mb-2 h-fit w-full">
                            <Star size={20} /> Shortlisted Candidates

                        </TabsTrigger>
                        <TabsTrigger value="settings" className="hover:bg-gray-800 text-white  mb-2 h-fit w-full">
                            <Settings size={20} /> Settings

                        </TabsTrigger>
                    </TabsList>
                </div>
                <div className="flex flex-1 bg-white">
                    <TabsContent value="dashboard"><Dashboard /></TabsContent>
                    <TabsContent value="job"><JobPostings /></TabsContent>
                    <TabsContent value="resumeAnalysis"><ResumeAnalysis /></TabsContent>
                    <TabsContent value="shortlistedCnadidates"><ShortlistedCandidates /></TabsContent>
                    <TabsContent value="settings"><RecruiterSettings /></TabsContent>
                </div>
            </Tabs>
        </div>

    )
}

export default Layout

